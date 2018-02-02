var socket = io();
socket.on('connect', function () {
    console.log('Connected to server!!!');
});
socket.on('disconnect', function () {
    console.log('Disconnected form server!');
});

socket.on('newMessage', function (message) {
    console.log('New message:', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);

});
// socket.emit('createMessage', {
//     from: 'Han Trinh',
//     text: "I'm fine, tks"
// }, function(data) {
//     console.log('Got it', data);
// });
$('#message-form').on('submit',function(event){
    event.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: $('[name=message]').val()
    },function() {

    });
});