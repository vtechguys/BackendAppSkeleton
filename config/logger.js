'use strict'

const log4js = require('log4js');
//Logger type configuration type
const { LOGGER_TYPE } = require('./config');

log4js.configure({
    appenders: {
        debug: {
            type: 'file',
            filename: 'logs/debug.log',
            category: 'debug',
            maxLogSize: 20480,
            backups: 10
        },
        info: {
            type: "file",
            filename: "logs/info.log",
            category: 'info',
            maxLogSize: 20480,
            backups: 10

        },
        error: {
            type: 'file',
            filename: "logs/error.log",
            category: 'error',
            maxLogSize: 20480,
            backups: 10
        },

    },
    categories: {
        default: {
            appenders: ['debug'],
            level: 'debug'
        }
    }
});
const logger = log4js.getLogger( LOGGER_TYPE );

module.exports = logger;

