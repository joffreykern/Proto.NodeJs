var http = require('http');
var fs = require('fs');
var express = require('express');

var port = process.env.port || 1337;
var server = http.createServer(function (req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(content);
    });
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
    console.log('new connection');

    socket.on('new_user', function(username){
        socket.set('username', username);
        socket.broadcast.emit('new_user', username);
    });

    socket.on('message', function(message){
        socket.get('username', function(error, username){
            socket.broadcast.emit('message_chat', {message : message, username : username});
        });
    });
});

server.listen(port);