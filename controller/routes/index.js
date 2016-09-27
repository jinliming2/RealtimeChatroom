/**
 * Created by Liming on 2016/9/27.
 */
"use strict";
let router = require('express').Router();
let users = require('../user');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register.html', (req, res) => {
    res.render('register');
});
router.post('/register.html', (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.name) {
        res.send('<script>alert("Please input username, password and name!");location.back();</script>');
        return;
    }
    users.register(req.body.username, req.body.password, req.body.name, "/i/default.png", (result) => {
        if(result) {
            res.send('<script>alert("Register success!");window.close();</script>');
        } else {
            res.send('<script>alert("Unknown error!");location.back();</script>');
        }
    });
});

module.exports = router;
