const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected!!!');
    //Send a welcome message to the user who just logged in
    socket.emit('newMessage',
        generateMessage('System', 'Welcome to the chat app!!!'));
    //Notify other users that a new user has logged in
    socket.broadcast.emit('newMessage',
        generateMessage('System', 'An user has been logged in'));

    socket.on('createMessage', (message, callback) => {
        console.log('Create Message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
