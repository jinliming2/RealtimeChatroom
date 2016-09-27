/**
 * Created by Liming on 2016/9/27.
 */
"use strict";
let mocha = require('mocha');
let describe = mocha.describe;
let it = mocha.it;
let assert = require('chai').assert;
let test = require('../controller/recentMessage');

let obj;

describe('recentMessage', () => {
    it('new object;', () => {
        obj = new test.recentMessage(5);
        assert.instanceOf(obj, test.recentMessage);
    });
    it('Get recent messages. (Empty)', () => {
        let messages = obj.getRecents();
        assert.instanceOf(messages, Array);
        assert.equal(messages.length, 0);
    });
    it('Save 3 messages.', () => {
        for(let i = 0; i < 3; i++) {
            obj.save({});
        }
        let messages = obj.getRecents();
        assert.instanceOf(messages, Array);
        assert.equal(messages.length, 3);
    });
    it('Save Another 3 messages.', () => {
        for(let i = 0; i < 3; i++) {
            obj.save({});
        }
        let messages = obj.getRecents();
        assert.instanceOf(messages, Array);
        assert.equal(messages.length, 5);
    });
    it('Save Another 3 messages.', () => {
        for(let i = 0; i < 3; i++) {
            obj.save({});
        }
        let messages = obj.getRecents();
        assert.instanceOf(messages, Array);
        assert.equal(messages.length, 5);
    });
});
