/**
 * Created by Liming on 2016/9/27.
 */
"use strict";
let router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
