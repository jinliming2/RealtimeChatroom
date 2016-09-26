/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
module.exports.htmlEntities = function(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};
