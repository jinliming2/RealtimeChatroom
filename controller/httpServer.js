/**
 * Created by Liming on 2016/9/27.
 */
"use strict";
//Module dependencies
let express = require('express');
let app = express();
let http = require('http');
let util = require('./util');

let port = util.normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Create http server use app
let httpServer = http.createServer(app);

//View Engine
app.set('view engine', 'ejs');
app.set('views', './view');

//Public resources root
app.use(express.static('./public'));

//Routes
app.use('/', require('./routes/index'));

//404 not found
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Handle error
if(app.get('env') == 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Listen port
httpServer.listen(port, () => {
    util.logger('D', 'Server is listening on *:' + port);
});

module.exports = httpServer;
