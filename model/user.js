/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
//Module dependencies
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/realtimeChatroom');

let schema = mongoose.Schema;
//Users
let usersModel = mongoose.model("users", new schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
    head: {type: String, require: true}
}));

module.exports = {
    users: usersModel
};
