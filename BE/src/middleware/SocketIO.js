import db from "../models";
import { v4 as uuidv4 } from 'uuid';

const socketService = (io) => {
    console.log('Setting socket...')

    io.on("connection", (socket) => {

        console.log('user connected', socket.id)

        socket.on("CREATE_ROOM", async (adminId, customerId) => {

            let roomId = uuidv4();

            await db.Room.create({
                roomId: roomId,
                adminId: adminId,
                customerId: customerId
            })
        });


        socket.on("JOIN_ROOM", async (roomId) => {

            socket.join(roomId);
            let message = await db.Room.findOne({
                where: {
                    roomId: roomId
                },
                include: [
                    {
                        model: db.Message,
                    }
                ]
            })

            io.to(roomId).emit("NEW_MESSAGE", message);
        });



        socket.on("NEW_MESSAGE", async (roomId, msg) => {

            await db.Message.Create({
                roomId: roomId,
                message: msg
            })

            io.to(roomId).emit("NEW_MESSAGE", msg);
        });

        socket.on("disconnect", (roomId) => {
            // Triggering this event disconnects user
            io.to(roomId).emit("user disconnected", socket.userId);
            socket.leave(roomId)
        });
    });


}


export default socketService;

