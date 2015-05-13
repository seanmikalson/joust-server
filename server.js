var express = require('express');
var http = require('http');
var socket = require('socket.io');

var app = express();

app.get('/', function(req, res){
    res.send('Web socket server for joust game. No HTML to serve :)');
});

var startServer = function() {
    var server = http.createServer(app);
    var io = socket(server);
    server.listen(8080, function() {
        console.log("Server Started");
    });

    io.on('connection', function(socket) {
        console.log('Client connected');
        socket.on('event', function(event) {
            socket.emit('event', event);
        });
    });

    io.on('disconnect', function() {
        console.log('Client disconnected');
    });
};

if (require.main === module) {
    startServer();
}