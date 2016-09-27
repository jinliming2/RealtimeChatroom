/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
//Module dependencies
let webSocketServer = require('websocket').server;
let http = require('http');
let util = require('./controller/util');
let users = require('./controller/user');
let recentMessage = new (require('./controller/recentMessage').recentMessage)();

//Constants
const MESSAGE_TYPE = {
    RECENT_MESSAGE: {
        code: 0,
        message: 'recent messages'
    }
};

process.title = 'Realtime Chatroom - WebSocket - Node.JS';
let port = util.normalizePort(process.env.PORT || '3000');

let clients = [];

//HTTP Server
let httpServer = http.createServer((request, response) => {
    response.write("{code: 0, message: 'success'}");
    response.end();
    response.destroy();
});
httpServer.listen(port, () => {
    util.logger('D', 'Server is listening on *:' + port);
});

//WebSocket Server
let wsServer = new webSocketServer({
    httpServer: httpServer
});
wsServer.on('request', (request) => {
    util.logger('D', 'New client ' + request.remoteAddress + ' connected from ' + request.origin);

    //Log in
    let {username, password} = request.resourceURL.query;
    //Check username and password
    users.validate(username, password, (result) => {
        //Reject
        //TODO: Auth
        // if(result === false) {
        //     request.reject(401, 'Username or password error!');
        //     util.logger('D', 'Connection rejected');
        //     return;
        // }
        util.logger('D', 'Validated User: ' + username);

        //Accept
        let connection = request.accept(null, request.origin);
        let index = clients.push(connection) - 1;
        util.logger('D', index + ' Connection accepted');

        //Send recent messages
        connection.sendUTF(JSON.stringify({
            code: 0,
            type: MESSAGE_TYPE.RECENT_MESSAGE.code,
            message: MESSAGE_TYPE.RECENT_MESSAGE.message,
            data: recentMessage.getRecents()
        }));
        util.logger('D', index + ' Sent recent messages');

        connection.on('message', (message) => {
            if (message.type === 'utf8') {
            }
        });

        connection.on('close', (code, message) => {
            util.logger('D', index + ' ' + message);
            clients.splice(index, 1);
        });
    });
});
