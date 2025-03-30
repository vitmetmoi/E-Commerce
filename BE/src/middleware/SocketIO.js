import db from "../models";
import { v4 as uuidv4 } from 'uuid';

const socketService = (io) => {
    console.log('Setting socket...')

    io.on("connection", (socket) => {

        console.log('user connected', socket.id)

        socket.on("CREATE_ROOM", async (adminId, customerId) => {

            let roomId = uuidv4();
            let room = await db.Room.findOne({ where: { customerId: customerId } });

            if (room && room.roomId) {
                socket.emit('NEW_MESSAGE', 'Room is exist!')
            }
            else {
                await db.Room.create({
                    roomId: roomId,
                    adminId: adminId,
                    customerId: customerId
                })

                socket.emit('NEW_MESSAGE', roomId)
            }

        });

        // socket.on("FIND_ROOM", async (customerId) => {


        //     let room = await db.Room.findOne({
        //         where: {
        //             customerId: customerId
        //         }
        //     })
        //     console.log('room', room)
        //     if (room && room.roomId) {
        //         socket.emit('NEW_MESSAGE', {
        //             roomId: room.roomId,
        //             msg: 'Find room completed!'
        //         })
        //     }
        //     else {
        //         socket.emit('NEW_MESSAGE', {
        //             roomId: '',
        //             msg: 'No room exist!'
        //         })
        //     }

        // });


        socket.on("JOIN_ROOM", async (customerId) => {

            // let room = await db.Room.findOne({
            //     where: {
            //         customerId: +customerId
            //     },
            //     include: [
            //         {
            //             model: db.Message,
            //         }
            //     ]
            // })


            let room = ''

            if (room && room.roomId) {

                rooms.Messages.map(item => {
                    socket.emit("NEW_MESSAGE", {
                        type: 'msg',
                        msg: item
                    });
                })

            }
            else {
                socket.emit('NEW_MESSAGE', {
                    roomId: '',
                    msg: 'No room exist!'
                })
            }
        });



        socket.on("NEW_MESSAGE", async (adminId, customerId, msg) => {

            let room = await db.Room.findOne({
                where: {
                    customerId: +customerId
                }
            })

            if (room && room.roomId) {
                await db.Message.create({
                    roomId: room.roomId,
                    message: msg
                })

                socket.emit("NEW_MESSAGE", {
                    type: 'msg',
                    senderId: customerId,
                    msg: msg
                });
            }



        });

        socket.on("disconnect", (roomId) => {
            // Triggering this event disconnects user
            io.to(roomId).emit("user disconnected", socket.userId);
            socket.leave(roomId)
        });
    });


}


export default socketService;

