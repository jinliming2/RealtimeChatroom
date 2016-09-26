/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
/**
 * Escaping input string
 * @param str
 * @return {string}
 */
module.exports.htmlEntities = (str) => {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};
/**
 * Normalize a port into a number, string, or false.
 * @param val
 * @return {*}
 */
module.exports.normalizePort = (val) => {
    let port = parseInt(val, 10);
    if(port >= 0) {
        // port number
        return port;
    }
    return false;
};
/**
 * Format output width
 * @param {*} text
 * @param {number} length
 * @param {string|number} fill
 * @return {string}
 */
module.exports.formatWidth = (text, length, fill) => {
    text = text.toString();
    if(text.length >= length) {
        return text;
    }
    fill = fill.toString();
    fill = fill.substr(0, 1);
    for(let i = 0; i < length; i++) {
        text = fill + text;
    }
    return text.substr(-length);
};
/**
 * Console log out
 * @param {string} type
 * @param {*} content
 */
module.exports.logger = (type, content) => {
    let fun;
    switch(type) {
        case 'd':
        case 'D':
        case 'debug':
        case 'Debug':
        case 'DEBUG':
            fun = console.log;
            break;
        case 'e':
        case 'E':
        case 'error':
        case 'Error':
        case 'ERROR':
            fun = content.error;
            break;
        case 'w':
        case 'W':
        case 'warning':
        case 'Warning':
        case 'WARNING':
            fun = content.warn;
            break;
    }
    let date = new Date();
    let f = module.exports.formatWidth;
    date = f(date.getFullYear(), 4, 0) + '-' + f(date.getMonth() + 1, 2, 0) + '-' + f(date.getDate(), 2, 0)
        + ' ' + f(date.getHours(), 2, 0) + ':' + f(date.getMinutes(), 2, 0) + ':' + f(date.getSeconds(), 2, 0)
        + '.' + f(date.getMilliseconds(), 3, 0);
    fun('[' + date + '] ', content);
};
