var socket = io();
socket.on('connect', function () {
    console.log('Connected to server!!!');
    // socket.emit('createEmail', {
    //     to: 'bang90@gmail.com',
    //     text: "I'm Bang. Nice to meet you too"
    // });
    // socket.emit('createMessage', {
    //     to: 'hantn16@gmail.com',
    //     text: "I'm fine, tks"
    // });
});
socket.on('disconnect', function () {
    console.log('Disconnected form server!');
});
socket.on('newEmail', function (email) {
    console.log('New email:', email);
});

socket.on('newMessage', function (message) {
    console.log('New message:', message);
});
