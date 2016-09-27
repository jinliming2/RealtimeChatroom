/**
 * Created by Liming on 2016/9/27.
 */
"use strict";
class recentMessage {
    /**
     * Recent message manager
     * @param {number} [maximum = 50]
     */
    constructor(maximum) {
        this.maximum = maximum || 50;
        this._messages = [];
        this._index = 0;
    }

    /**
     * Save new message
     * @param {*} message
     */
    save(message) {
        this._messages[this._index++] = message;
        if(this._index >= this.maximum) {
            this._index = 0;
        }
    }

    /**
     * Get recent messages
     * @return {Array} messages
     */
    getRecents() {
        if(this._messages.length < this.maximum) {
            return Array.from(this._messages);
        }
        let flag = false;
        let _new = [];
        for(let i = this._index; i != this._index && flag; i++) {
            if(i >= this.maximum) {
                i = 0;
                flag = true;
            }
            _new.push(this._messages[i]);
        }
        return _new;
    }
}

module.exports.recentMessage = recentMessage;
