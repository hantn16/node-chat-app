
var socket = io();
var locationButton = jQuery('#send-location');
var messageTextbox = $('[name=message]');

function scrollToBottom() {
    //Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

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
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    console.log('New message:', message);
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
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
    locationButton.attr('disabled', 'disabled').text('Sending location...');
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