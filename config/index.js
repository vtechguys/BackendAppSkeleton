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



//aws configs
const AWS_CONFIG = require('./awsConfig');
// const AWS = require('./aws');
//Schema_Names
const SCHEMA_NAMES = require('./schema');








//Main export of file
const indexConfig = {
    "responseTypes": RESPONSE_TYPES,
    "logger": LOGGER,
    "welcomePage": WELCOME_PAGE_PATH,
    "staticContentPath": STATIC_FILES_SERVING_PATH,

    //awsConfig
    "AWS_USER_KEY": AWS_CONFIG.AWS_USER_KEY,
    "AWS_USER_SECRET": AWS_CONFIG.AWS_USER_SECRET,
    "AWS_REGION": AWS_CONFIG.AWS_REGION,
    "AWS_BUCKET_URL": AWS_CONFIG.AWS_BUCKET_URL,
    "AWS_CLOUDFRONT_URL": AWS_CONFIG.AWS_CLOUDFRONT_URL,
    "AWS_BUCKET_Assets": AWS_CONFIG.AWS_BUCKET_Assets,
    "AWS_BUCKET_Profile": AWS_CONFIG.AWS_BUCKET_Profile,
    
    //awsOperations
    // "awsOperations":AWS,

    //schemaNames
    "schemaNames": SCHEMA_NAMES

};

module.exports = indexConfig;