/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
let mocha = require('mocha');
let describe = mocha.describe;
let it = mocha.it;
let assert = require('chai').assert;
let test = require('../controller/util');

describe('htmlEntities', () => {
    it('i > 1 && j < 2 => i &gt; 1 &amp;&amp; j &lt; 2', () => {
        assert.equal(test.htmlEntities('i > 1 && j < 2'), 'i &gt; 1 &amp;&amp; j &lt; 2');
    });
    it('A programmer said: "PHP is the best programming language in the world!" => A programmer said: &quot;PHP is the best programming language in the world!&quot;', () => {
        assert.equal(
            test.htmlEntities('A programmer said: "PHP is the best programming language in the world!"'),
            'A programmer said: &quot;PHP is the best programming language in the world!&quot;'
        );
    });
});

describe('normalizePort', () => {
    it('(int)80 => 80', () => {
        assert.strictEqual(test.normalizePort(80), 80);
    });
    it('(int)3000 => 3000', () => {
        assert.strictEqual(test.normalizePort(3000), 3000);
    });
    it("(int)-1 => false", () => {
        assert.strictEqual(test.normalizePort(-1), false);
    });
    it("(string)'80' => 80", () => {
        assert.strictEqual(test.normalizePort('80'), 80);
    });
    it("(string)'3000' => 3000", () => {
        assert.strictEqual(test.normalizePort('3000'), 3000);
    });
    it("(string)'-1' => false", () => {
        assert.strictEqual(test.normalizePort('-1'), false);
    });
});

describe('formatWidth', () => {
    it('(1, 2, "0") => "01"', () => {
        assert.equal(test.formatWidth(1, 2, "0"), "01");
    });
    it('(12, 2, "0") => "12"', () => {
        assert.equal(test.formatWidth(12, 2, "0"), "12");
    });
    it('(2016, 2, "0") => "2016"', () => {
        assert.equal(test.formatWidth(2016, 2, "0"), "2016");
    });
    it('(0, 3, "0") => "000"', () => {
        assert.equal(test.formatWidth(0, 3, "0"), "000");
    });
    it('(66, 3, "0") => "066"', () => {
        assert.equal(test.formatWidth(66, 3, "0"), "066");
    });
    it('(789, 3, "0") => "789"', () => {
        assert.equal(test.formatWidth(789, 3, "0"), "789");
    });
});

describe('logger', () => {
    it('e', () => {
        assert.doesNotThrow(() => {
            test.logger("e", "e");
        });
    });
    it('E', () => {
        assert.doesNotThrow(() => {
            test.logger("E", "E");
        });
    });
    it('error', () => {
        assert.doesNotThrow(() => {
            test.logger("error", "error");
        });
    });
    it('Error', () => {
        assert.doesNotThrow(() => {
            test.logger("Error", "Error");
        });
    });
    it('ERROR', () => {
        assert.doesNotThrow(() => {
            test.logger("ERROR", "ERROR");
        });
    });
    it('w', () => {
        assert.doesNotThrow(() => {
            test.logger("w", "w");
        });
    });
    it('W', () => {
        assert.doesNotThrow(() => {
            test.logger("W", "W");
        });
    });
    it('warning', () => {
        assert.doesNotThrow(() => {
            test.logger("warning", "warning");
        });
    });
    it('Warning', () => {
        assert.doesNotThrow(() => {
            test.logger("Warning", "Warning");
        });
    });
    it('WARNING', () => {
        assert.doesNotThrow(() => {
            test.logger("WARNING", "WARNING");
        });
    });
    it('d', () => {
        assert.doesNotThrow(() => {
            test.logger("d", "d");
        });
    });
    it('D', () => {
        assert.doesNotThrow(() => {
            test.logger("D", "D");
        });
    });
    it('debug', () => {
        assert.doesNotThrow(() => {
            test.logger("debug", "debug");
        });
    });
    it('Debug', () => {
        assert.doesNotThrow(() => {
            test.logger("Debug", "Debug");
        });
    });
    it('DEBUG', () => {
        assert.doesNotThrow(() => {
            test.logger("DEBUG", "DEBUG");
        });
    });
});
