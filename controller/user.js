/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
//Module dependencies
let users = require('../model/user').users;
let util = require('./util');

/**
 * Validate username and password
 * @param {string} username
 * @param {string} password
 * @param {Function} result
 */
module.exports.validate = (username, password, result) => {
    //Find username
    users.findOne({username: username}, (error, data) => {
        if(error) {
            util.logger('E', error);
            result(false);
        } else if(data) {
            if(data.password && data.password == password) {
                result({
                    username: data.username,
                    name: data.name,
                    head: data.head
                });
            } else {
                util.logger('D', 'Password error');
                result(false);
            }
        } else {
            util.logger('D', 'Username not found');
            result(false);
        }
    });
};

/**
 * Register
 * @param {string} username
 * @param {string} password
 * @param {string} name
 * @param {string} head
 * @param {Function} result
 */
module.exports.register = (username, password, name, head, result) => {
    users.findOne({
        username: username
    }, (error, data) => {
        if(error) {
            util.logger('E', error);
            result(false);
        } else if(data) {
            result({code: -1, message: 'Username exists!'});
        } else {
            new users({
                username: username,
                password: password,
                name: name,
                head: head
            }).save((error, data) => {
                if(error) {
                    util.logger('E', error);
                    result(false);
                } else if(data) {
                    result({code: 0, message: 'success', data: data._doc});
                } else {
                    result(false);
                }
            });
        }
    });
};
