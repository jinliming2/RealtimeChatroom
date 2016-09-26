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
