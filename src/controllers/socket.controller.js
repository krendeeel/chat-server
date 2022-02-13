const rooms = require('../db');

const NEW_MESSAGE = 'ROOM:NEW_MESSAGE';
const JOIN = 'ROOM:JOIN';
const SET_USERS = 'ROOM:SET_USERS';

const socketController = (io) => {
    io.on("connection", (socket) => {
        socket.on(JOIN, async ({ roomId, name }) => {
            socket.join(roomId);
            rooms.get(roomId).get('users').set(socket.id, name);
            const users = [...rooms.get(roomId).get('users').values()];
            socket.to(roomId).emit(SET_USERS, users);
        })
        socket.on(NEW_MESSAGE, async ({ user, text, time }) => {
            const message = {
                username: user.name,
                text,
                time
            };
            rooms.get(user.roomId).get('messages').push(message);
            socket.to(user.roomId).emit(NEW_MESSAGE, message);
        })
        socket.on('disconnect', () => {
            rooms.forEach((value, roomId) => {
                if (value.get('users').delete(socket.id)) {
                    const users = [...value.get('users').values()];
                    socket.to(roomId).emit(SET_USERS, users);
                }
            });

        })

    })
}

module.exports = socketController;