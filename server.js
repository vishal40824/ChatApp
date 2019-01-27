var express = require('express');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var ip = require('ip');
var app = express();
var port = process.env.PORT || 5000;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var server = app.listen(port, function () {
   console.log("Listening to http://%s:%s", ip.address(), server.address().port);
});

var io = socket(server);

io.on('connection',function (socket) {
    console.log("Made a socket connection with client ID: " + socket.id);

    socket.on('chat', function (data) {
        io.sockets.emit('ServerChat', data);
    });

    socket.on('pressed', function (data) {
        socket.broadcast.emit('typing', data);
    });
});