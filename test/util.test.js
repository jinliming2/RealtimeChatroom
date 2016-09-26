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
        expect(test.htmlEntities('i > 1 && j < 2')).to.equal('i &gt; 1 &amp;&amp; j &lt; 2');
    });
    it('A programmer said: "PHP is the best programming language in the world!" => A programmer said: &quot;PHP is the best programming language in the world!&quot;', function() {
        expect(test.htmlEntities('A programmer said: "PHP is the best programming language in the world!"'))
            .to.equal('A programmer said: &quot;PHP is the best programming language in the world!&quot;');
    });
});
