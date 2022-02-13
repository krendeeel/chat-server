const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const createRoutes = require('./routers');

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'https://reactappchat-client.herokuapp.com',
        methods: ["POST", "GET"]
    }
});

createRoutes(app, io);

const startServer = async () => {
    try {
        server.listen(PORT, () => console.log('Server started'));
    } catch (error) {
        console.log(error)
    }
}

startServer();