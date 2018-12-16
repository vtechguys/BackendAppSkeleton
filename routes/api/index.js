'use strict'

//Express and router
const express = require('express');
//router Obj initialise
const router = express.Router();
//path
const path = require('path');
//config
const config = require('../../config');

const logger = config.logger;


// @route GET /
// @description sends back build front-end file index.html
// @Access Public Access
router.get('/', (request, response) =>{
    logger.debug('routes/api. GET /. Will send path to welcome page.');
    //base welcome path could be another server path in that case just send this path in response.sendFile(welcomePathBase)
    let welcomePathBase = config.welcomePage;
    //normailse path move to root cd ./../../ ie up api up routes to ~/folder-App
    let root = path.normalize( __dirname + '/../../');
    //In case welcomepage lies on our server completing the path.
    let welcomePagePathComplete = path.join( root, welcomePathBase );
    //sending the HTML file and other static files request
    response.sendFile(welcomePagePathComplete);

})



// @route POST /web-index
// @description webIndex checks the index of user session for present token
// @Access Public Access
router.post('/web-index', (request, response )=>{
    response.send('text');
});


module.exports = router;