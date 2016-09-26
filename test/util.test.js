/**
 * Created by Liming on 2016/9/26.
 */
"use strict";
let describe = require("mocha").describe;
let it = require("mocha").it;
let expect = require('chai').expect;
let test = require('../controller/util');

describe('htmlEntities', function() {
    it('i > 1 && j < 2 => i &gt; 1 &amp;&amp; j &lt; 2', function() {
        return expect(test.htmlEntities('i > 1 && j < 2')).to.equal('i &gt; 1 &amp;&amp; j &lt; 2');
    });
    it('A programmer said: "PHP is the best programming language in the world!" => A programmer said: &quot;PHP is the best programming language in the world!&quot;', function() {
        return expect(test.htmlEntities('A programmer said: "PHP is the best programming language in the world!"'))
            .to.equal('A programmer said: &quot;PHP is the best programming language in the world!&quot;');
    });
});

describe('normalizePort', function() {
    it('(int)80 => 80', function() {
        return expect(test.normalizePort(80)).to.equal(80);
    });
    it('(int)3000 => 3000', function() {
        return expect(test.normalizePort(3000)).to.equal(3000);
    });
    it("(int)-1 => false", function() {
        return expect(test.normalizePort(-1)).to.false;
    });
    it("(string)'80' => 80", function() {
        return expect(test.normalizePort('80')).to.equal(80);
    });
    it("(string)'3000' => 3000", function() {
        return expect(test.normalizePort('3000')).to.equal(3000);
    });
    it("(string)'-1' => false", function() {
        return expect(test.normalizePort('-1')).to.false;
    });
});

describe('formatWidth', function() {
    it('(1, 2, "0") => "01"', function() {
        return expect(test.formatWidth(1, 2, "0")).to.equal("01");
    });
    it('(12, 2, "0") => "12"', function() {
        return expect(test.formatWidth(12, 2, "0")).to.equal("12");
    });
    it('(2016, 2, "0") => "2016"', function() {
        return expect(test.formatWidth(2016, 2, "0")).to.equal("2016");
    });
});
