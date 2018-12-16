'use strict'

const express = require('express');
//public folder rendering purpose
const path = require('path');
//console based http request logger
const loggerHttp = require('morgan');
//Http request body parsing
const bodyParser = require('body-parser');
//favicon for app
const mfavicon = require("express-favicon");

//APP
const app = express();
//CORS
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//LOGGER_HTTP Morgan
app.use( loggerHttp( 'dev' ) );

//Body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//static files requests
app.use( express.static( path.join(__dirname, 'public/build' ) ) );

//favicon pickup from ~/public/build/favicon
app.use( mfavicon( path.join( __dirname, 'public/build' )  ) );

//crash report
require('crashreporter').configure({
    outDir: './logs', // default to cwd
    exitOnCrash: true, // if you want that crash reporter exit(1) for you, default to true,
    maxCrashFile: 100, // older files will be removed up, default 5 files are kept
    // mailEnabled: true,
    // mailTransportName: 'SMTP',
    // mailTransportConfig: {
    //     service: 'Gmail',
    //     auth: {
    //         user: "yourmail@gmail.com",
    //         pass: "yourpass"
    //     }
    // },
    // mailSubject: 'advanced.js crashreporter test',
    // mailFrom: 'crashreporter <yourmail@gmail.com>',
    // mailTo: 'yourmail@gmail.com'
});


//Routes here

const index = require('./routes/index');

app.use( '/' , index );

app.use('*',index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


const logger = require('./config/logger');
logger.debug('logger first debug');
//PORT provided by server or 5000 dev
const PORT = process.env.PORT || 5000;
//Server starting
app.listen(1234,function(){
    console.log(`Server listeninig on port ${PORT}`);
})