/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
//Module dependencies
let webSocketServer = require('websocket').server;
let http = require('http');
let util = require('./controller/util');

process.title = 'Realtime Chatroom - WebSocket - Node.JS';
let port = util.normalizePort(process.env.PORT || '3000');

let clients = [];

//HTTP Server
let httpServer = http.createServer(function(request, response) {
});
httpServer.listen(port, function() {
    util.logger('D', 'Server is listening on *:' + port);
});

//WebSocket Server
let wsServer = new webSocketServer({
    httpServer: httpServer
});
wsServer.on('request', function(request) {
    util.logger('D', 'New client connected: ' + request.origin);
    let connection = request.accept(null, request.origin);

    let index = clients.push(connection) - 1;

    util.logger('D', 'Connection accepted');

    connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text
        }
    });

    connection.on('close', function(connection) {
        clients.splice(index, 1);
    });
});
