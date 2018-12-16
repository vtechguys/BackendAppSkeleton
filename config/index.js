'use strict'
/**
 * Will contain config for complete project
 */


//All possible responses
const RESPONSE_TYPES = {
    "FAIL" : "fail",
    "SERVER_ERROR" : "server-error",
    "SUCCESS" : "success",
    "UNKNOWN" : 'unknown',
    "UNPROCESSABLE_ENTITY" : "unprocessable-entity",
    "UNAUTHORIZED" : 'unauthorized',
    "BAD_REQUEST" : 'bad-request',
    "NOT_FOUND" : 'not-found'
};
//Static files serving path
const STATIC_FILES_SERVING_PATH = 'public/build';

//welcome page path may be on different server all on self
const WELCOME_PAGE_PATH = process.env.WELCOME_PAGE_PATH || ( STATIC_FILES_SERVING_PATH + '/index.html' );

//logger to be used in routes/crudOperations
const LOGGER = require('./logger');

//utils to be used in routes/crudOperations
const UTILS = require('./utils');

//Main export of file
const indexConfig = {
    "responseTypes": RESPONSE_TYPES,
    "utils": UTILS,
    "logger": LOGGER,
    "welcomePage": WELCOME_PAGE_PATH,
    "staticContentPath": STATIC_FILES_SERVING_PATH
};

module.exports = indexConfig;