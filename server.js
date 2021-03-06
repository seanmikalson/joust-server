var express = require('express');
var http = require('http');
var socket = require('socket.io');
var util = require('./util');
var Map = require('./map').Map;
var gamemap = new Map();

var app = express();

app.get('/', function(req, res){
    res.send('Web socket server for joust game. No HTML to serve :)');
});

var startServer = function() {
    var server = http.createServer(app);
    var io = socket(server);
    server.listen(process.env.PORT || 80, function() {
        console.log("Server Started");
    });

    io.on('connection', function(socket) {
        console.log('Client connected');
        console.log(JSON.stringify(gamemap));

        socket.on('display', function(event) {
            var gameId;
            do {
                gameId = util.generateGameId();
            } while(gamemap.isGameInUse(gameId));

            gamemap.add(socket.id, gameId);
            socket.emit('display', {gameid:gameId});

        });

        socket.on('control', function(data) {

            // Pass on character data so that display can create a character and display
            console.log('control'+JSON.stringify(data));
            io.emit('control'+data.gameid, data);

            var gameId = data.gameid;
            var character = data.character;
            socket.on('down-' + gameId, function(data) {
                io.emit('down-'+gameId, data);
            });

            socket.on('up-'+gameId, function(data) {
                io.emit('up-'+gameId, data);
            });
        });

    });

    io.on('disconnect', function(socket) {
        gamemap.remove(socket.id);
    });
};

if (require.main === module) {
    startServer();
}