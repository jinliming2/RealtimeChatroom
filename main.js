/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
//Module dependencies
let webSocketServer = require('websocket').server;
let httpServer = require('./controller/httpServer');
let util = require('./controller/util');
let users = require('./controller/user');
let recentMessage = new (require('./controller/recentMessage').recentMessage)();

//Constants
const MESSAGE_TYPE = {
    RECENT_MESSAGE: {
        code: 0,
        message: 'recent messages'
    },
    CLIENT_EXIT: {
        code: 1,
        message: 'client exit'
    },
    MESSAGE: {
        code: 2,
        message: 'message'
    }
};

process.title = 'Realtime Chatroom - WebSocket - Node.JS';

let clients = [];

/**
 * Broadcast message to each client
 * @param {string|object} message
 */
let broadcast = function(message) {
    if(!(message instanceof String)) {
        message = JSON.stringify(message);
    }
    for(let client of clients) {
        if(client) {
            client.connect.sendUTF(message);
        }
    }
};

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
        if(result === false) {
            request.reject(401, 'Username or password error!');
            util.logger('D', 'Connection rejected');
            return;
        }
        util.logger('D', 'Validated User: ' + username);

        //Accept
        let connection = request.accept(null, request.origin);
        let index = clients.push({
                connect: connection,
                info: result
            }) - 1;
        util.logger('D', index, '(' + result.name + ')', 'Connection accepted');

        //Send recent messages
        connection.sendUTF(JSON.stringify({
            code: 0,
            type: MESSAGE_TYPE.RECENT_MESSAGE.code,
            message: MESSAGE_TYPE.RECENT_MESSAGE.message,
            user: result,
            data: recentMessage.getRecents()
        }));
        util.logger('D', index, '(' + result.name + ')', 'Sent recent messages');

        connection.on('message', (message) => {
            if(message.type == 'utf8') {
                util.logger('D', index, '(' + result.name + ')', 'said: ' + message.utf8Data);
                let msg = {
                    _t: Date.now(),
                    sender: result,
                    content: util.htmlEntities(message.utf8Data)
                };
                recentMessage.save(msg);
                broadcast({
                    code: 0,
                    type: MESSAGE_TYPE.MESSAGE.code,
                    message: MESSAGE_TYPE.MESSAGE.message,
                    data: msg
                });
            } else {
                util.logger('W', index, '(' + result.name + ')', message.utf8Data);
            }
        });

        connection.on('close', (code, message) => {
            util.logger('D', index, '(' + result.name + ')', message);
            let info = clients[index].info;
            clients[index] = null;
            broadcast({
                code: 0,
                type: MESSAGE_TYPE.CLIENT_EXIT.code,
                message: MESSAGE_TYPE.CLIENT_EXIT.message,
                data: info
            });
        });
    });
});
