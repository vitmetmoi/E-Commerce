
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

                socket.emit('NEW_MESSAGE', {
                    type: 'msg',
                    senderId: 0,
                    msg: 'What can we help you ?'
                },)
            }

        });

        socket.on("JOIN_ROOM", async (customerId) => {

            let room = await db.Room.findOne({
                where: {
                    customerId: +customerId
                }
            })


            if (room && room.roomId) {

                let messagesInRoom = await db.Message.findAll({
                    where: { roomId: room.roomId }
                })
                if (messagesInRoom && messagesInRoom.length > 0) {
                    messagesInRoom.map(item => {
                        socket.emit("NEW_MESSAGE", {
                            id: item.id,
                            type: 'msg',
                            senderId: item.senderId,
                            msg: item.message
                        });
                    })
                }


            }
            else {
                socket.emit('NEW_MESSAGE', {
                    roomId: '',
                    msg: 'No room exist!'
                })
            }
        });

        socket.on("FIND_ALL_ROOM", async () => {

            let room = await db.Room.findAll({})


            if (room && room.length > 0) {
                socket.emit("NEW_MESSAGE", {
                    type: 'room',
                    msg: 'Finded',
                    data: room
                });
            }

            else {
                socket.emit("NEW_MESSAGE", {
                    type: 'room',
                    msg: 'No rooms exist!',
                    data: ''
                });
            }


        })



        socket.on("NEW_MESSAGE", async (adminId, customerId, msg) => {
            console.log('new message from frontend', adminId, customerId, msg)

            let room = await db.Room.findOne({
                where: {
                    customerId: +customerId
                }
            })

            if (room && room.roomId) {
                let newMsg = await db.Message.create({
                    roomId: room.roomId,
                    senderId: (customerId && adminId === 0) ? customerId : adminId,
                    message: msg
                })

                io.emit("NEW_MESSAGE", {
                    id: newMsg.id,
                    type: 'msg',
                    senderId: (customerId && adminId === 0) ? customerId : adminId,
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

