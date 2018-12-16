'use strict'
/**
 * Will contain config for complete project
 */

const responseTypes = {
    FAIL = "fail",
    SERVER_ERROR = "server-error",
    SUCCESS = "success",
    UNKNOWN = 'unknown',
    UNPROCESSABLE_ENTITY = "unprocessable-entity",
    UNAUTHORIZED = 'unauthorized',
    BAD_REQUEST = 'bad-request',
    NOT_FOUND = 'not-found'
};

const indexConfig = {
    responseTypes:responseTypes
};

module.exports = indexConfig;