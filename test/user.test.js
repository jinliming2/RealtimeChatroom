/**
 * Created by Liming on 2016/9/27.
 */
"use strict";
let mocha = require('mocha');
let describe = mocha.describe;
let it = mocha.it;
let assert = require('chai').assert;
let users = require('../model/user').users;
let test = require('../controller/user');

let testObjId = [];

describe('register', () => {
    it('Register username: "123", password: "456", name: "testName", head: "testHead"', (done) => {
        assert.doesNotThrow(() => {
            test.register('123', '456', 'testName', 'testHead', (result) => {
                testObjId.push(result.data._id.toString());
                assert.deepEqual(result, {
                    code: 0,
                    message: 'success',
                    data: result.data
                });
                done();
            });
        });
    });
    it('Register username: "123", password: "456", name: "testName", head: "testHead" again will failure', (done) => {
        assert.doesNotThrow(() => {
            test.register('123', '456', 'testName', 'testHead', (result) => {
                assert.deepEqual(result, {
                    code: -1,
                    message: 'Username exists!'
                });
                done();
            });
        });
    });
});

describe('validate', () => {
    it('Validate username: "123", password: "123" will failure', (done) => {
        assert.doesNotThrow(() => {
            test.validate('123', '123', (result) => {
                assert.strictEqual(result, false);
                done();
            });
        });
    });
    it('Validate username: "123", password: "456" will success', (done) => {
        assert.doesNotThrow(() => {
            test.validate('123', '456', (result) => {
                assert.deepEqual(result, {
                    username: '123',
                    name: 'testName',
                    head: 'testHead'
                });
                done();
            });
        });
    });
});

describe('Addition', () => {
    it('Delete test data', (done) => {
        users.remove({_id: {$in: testObjId}}, (error, data) => {
            if(error) {
                done(error);
            }
            if(data) {
                done();
            } else {
                done(new Error("Delete failure"));
            }
        });
    });
});
