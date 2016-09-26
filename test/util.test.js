/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
let mocha = require('mocha');
let describe = mocha.describe;
let it = mocha.it;
let expect = require('chai').expect;
let test = require('../controller/util');

describe('htmlEntities', () => {
    it('i > 1 && j < 2 => i &gt; 1 &amp;&amp; j &lt; 2', () => {
        return expect(test.htmlEntities('i > 1 && j < 2')).equal('i &gt; 1 &amp;&amp; j &lt; 2');
    });
    it('A programmer said: "PHP is the best programming language in the world!" => A programmer said: &quot;PHP is the best programming language in the world!&quot;', () => {
        return expect(test.htmlEntities('A programmer said: "PHP is the best programming language in the world!"'))
            .equal('A programmer said: &quot;PHP is the best programming language in the world!&quot;');
    });
});

describe('normalizePort', () => {
    it('(int)80 => 80', () => {
        return expect(test.normalizePort(80)).equal(80);
    });
    it('(int)3000 => 3000', () => {
        return expect(test.normalizePort(3000)).equal(3000);
    });
    it("(int)-1 => false", () => {
        return expect(test.normalizePort(-1)).false;
    });
    it("(string)'80' => 80", () => {
        return expect(test.normalizePort('80')).equal(80);
    });
    it("(string)'3000' => 3000", () => {
        return expect(test.normalizePort('3000')).equal(3000);
    });
    it("(string)'-1' => false", () => {
        return expect(test.normalizePort('-1')).false;
    });
});

describe('formatWidth', () => {
    it('(1, 2, "0") => "01"', () => {
        return expect(test.formatWidth(1, 2, "0")).equal("01");
    });
    it('(12, 2, "0") => "12"', () => {
        return expect(test.formatWidth(12, 2, "0")).equal("12");
    });
    it('(2016, 2, "0") => "2016"', () => {
        return expect(test.formatWidth(2016, 2, "0")).equal("2016");
    });
    it('(0, 3, "0") => "000"', () => {
        return expect(test.formatWidth(0, 3, "0")).equal("000");
    });
    it('(66, 3, "0") => "066"', () => {
        return expect(test.formatWidth(66, 3, "0")).equal("066");
    });
    it('(789, 3, "0") => "789"', () => {
        return expect(test.formatWidth(789, 3, "0")).equal("789");
    });
});
