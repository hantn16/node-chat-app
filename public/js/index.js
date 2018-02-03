var socket = io();
var locationButton = jQuery('#send-location');

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

socket.on('newLocationMessage', function (message) {
    console.log('New message:', message);
    var li = $('<li></li>');  
    var a = $('<a target="_blank"></a>');
    li.text(`${message.from}: `);
    a.text(`${message.text}`);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    });
});
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function (err) {
        console.log('err', err);
        alert('Unable to specified your location');
    });
});