'use strict'

const AWS = require('aws-sdk');
const request = require('request');

const config = require('./awsConfig');
const logger = require('./logger');

var s3 = new AWS.S3();

const awsOperations = {

    s3Upload:function(bucket, file, name, callback){
        logger.debug('config/aws.js aws s3Upload');
        let s3Bucket = new AWS.S3(
            {
                accessKeyId: config.AWS_USER_KEY,
                secretAccessKey: config.AWS_USER_SECRET,
                Bucket: bucket,

            },
            {
                partSize:  10 * 1024 * 1024,
                queueSize: 100

            }
        );

        let params = {
            Bucket: bucket,
            Key: name,
            Body: file,
        };

        s3Bucket.upload(params, function (error, result) {
            if (error) {
                logger.error(error);
                callback(error, null);
            }
            else {
                logger.debug(result);
                callback(null, result);
            }
        });

    },
    s3Delete : function(bucket, filename, callback){

        let params = {  
            Bucket: bucket, 
            Key: filename 
        };

        s3.deleteObject(params, function(err, result) {
            if (error) {
                logger.error(error);
                callback(error, null);
            }
            else{
                callback(null, result);
            }   
        });
    }



};
module.exports = awsOperations;