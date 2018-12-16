'use strict'

const express = require('express');
const router = express.Router();


// @route POST /web-index
// @description webIndex checks the index of user session for present token
// @Access Public Access
router.post('/web-index', (request, response )=>{
    response.send('text')
})

module.exports = router;