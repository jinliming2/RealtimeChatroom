/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
//Module dependencies
let webSocketServer = require('websocket').server;
let http = require('http');
let util = require('./controller/util');
let users = require('./controller/user');

process.title = 'Realtime Chatroom - WebSocket - Node.JS';
let port = util.normalizePort(process.env.PORT || '3000');

let clients = [];
let recentMessages = [];

//HTTP Server
let httpServer = http.createServer((request, response) => {
});
httpServer.listen(port, () => {
    util.logger('D', 'Server is listening on *:' + port);
});

//WebSocket Server
let wsServer = new webSocketServer({
    httpServer: httpServer
});
wsServer.on('request', (request) => {
    util.logger('D', 'New client connected: ' + request.origin);

    //Log in
    let {username, password} = request.resourceURL.query;
    //Check username and password
    users.validate(username, password, (result) => {
        //Reject
        if(result === false) {
            request.reject(401, 'Username or password error!');
            util.logger('D', 'Connection rejected');
            return;
        }

        //Accept
        let connection = request.accept(null, request.origin);
        let index = clients.push(connection) - 1;
        util.logger('D', 'Connection accepted');

        connection.on('message', (message) => {
            if (message.type === 'utf8') {
            }
        });

        connection.on('close', (code, message) => {
            util.logger('D', message);
            clients.splice(index, 1);
        });
    });
});
