'use strict'

//access key id
//AKIAJIFFTBBXNE2APV6Q

//secret access key
//IhzC8ZaknWDEmBsFpjcUa1joTZJ060KsPJSyruVk

//user arn
//arn:aws:iam::659261511556:user/vtechguys






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

//aws configs
const awsConfig = require('./awsConfig');
const aws = require('./aws');
//Main export of file
const indexConfig = {
    "responseTypes": RESPONSE_TYPES,
    "utils": UTILS,
    "logger": LOGGER,
    "welcomePage": WELCOME_PAGE_PATH,
    "staticContentPath": STATIC_FILES_SERVING_PATH,
    //awsConfig
    "AWS_USER_KEY": awsConfig.AWS_USER_KEY,
    "AWS_USER_SECRET": awsConfig.AWS_USER_SECRET,
    "AWS_REGION": awsConfig.AWS_REGION,
    "AWS_BUCKET_URL": awsConfig.AWS_BUCKET_URL,
    "AWS_CLOUDFRONT_URL": awsConfig.AWS_CLOUDFRONT_URL,
    "AWS_BUCKET_Assets": awsConfig.AWS_BUCKET_Assets,
    "AWS_BUCKET_Profile": awsConfig.AWS_BUCKET_Profile,
    //awsOperations
    "awsOperations":aws

};

module.exports = indexConfig;