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
//configurations
const config = require('./config');


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

//static path
const staticContentPath = config.staticContentPath;
//static files requests
app.use( express.static( path.join(__dirname, staticContentPath ) ) );

//favicon pickup from ~/public/build/favicon

app.use( mfavicon( path.join( __dirname, ( staticContentPath+'/favicon.png') )  ) );

//crash report
require('crashreporter').configure({
    'outDir': './logs', // default to cwd
    'exitOnCrash': true, // if you want that crash reporter exit(1) for you, default to true,
    'maxCrashFile': 100, // older files will be removed up, default 5 files are kept
    
    //if you want to mail the crash reports 
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

////////////////////////

//Routes here

//Import routes
const index = require('./routes/api/index');
const users = require('./routes/api/users');

//Route path match and going
app.use( '/' , index );
app.use('/users',users);
app.use('*',index);

//////////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//PORT provided by server in production or 5000 dev
const PORT = process.env.PORT || 5000;
//Server starting
app.listen(PORT,function(){
    console.log(`Server listeninig on port ${PORT}`);
})