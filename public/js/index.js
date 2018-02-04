
var socket = io();
var locationButton = jQuery('#send-location');
var messageTextbox = $('[name=message]');

socket.on('connect', function () {
    console.log('Connected to server!!!');
});
socket.on('disconnect', function () {
    console.log('Disconnected form server!');
});

socket.on('newMessage', function (message) {
    console.log('New message:', message);
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);

});

socket.on('newLocationMessage', function (message) {
    console.log('New message:', message);
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

$('#message-form').on('submit', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, function (err) {
        console.log('err', err);
        alert('Unable to specified your location');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});