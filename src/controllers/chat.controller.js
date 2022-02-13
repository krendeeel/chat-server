const rooms = require('../db');

class ChatController {
    getRoomData = async (req, res) => {
        const { roomId } = req.params;
        const roomData = rooms.has(roomId)
            ? {
                onlineUsers: [...rooms.get(roomId).get('users').values()],
                messages: [...rooms.get(roomId).get('messages').values()],
            }
            : {
                onlineUsers: [],
                messages: []
            };
        return res.status(200).json(roomData);
    };

    createRoom = async (req, res) => {
        const { roomId } = req.body;
        if (!rooms.has(roomId)) {
            rooms.set(
                roomId,
                new Map([
                    ['users', new Map()],
                    ['messages', []],
                ]),
            );
        }
        res.send();
    };

}

module.exports = new ChatController();