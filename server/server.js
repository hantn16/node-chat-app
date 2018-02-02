const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected!!!');
    //Send a welcome message to the user who just logged in
    socket.emit('newMessage',{
        from: 'System',
        text: 'Welcome to the chat app!!!',
        createdAt: new Date().getTime()
    });
    //Notify other users that a new user has logged in
    socket.broadcast.emit('newMessage',{
        from: 'System',
        text: 'An user has been logged in',
        createdAt: new Date().getTime()
    })
    socket.on('createEmail', (email) => {
        console.log('Create Email', email);
        io.emit('newEmail', {
            from: email.from,
            text: email.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('createMessage', (message) => {
        console.log('Create Message', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
