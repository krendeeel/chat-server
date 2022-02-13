const ChatController = require('../controllers/chat.controller');
const socketController = require('../controllers/socket.controller')

const createRoutes = (app, io) => {
    socketController(io);
    app.get('/rooms/:roomId', ChatController.getRoomData);
    app.post('/rooms', ChatController.createRoom);
};

module.exports = createRoutes;