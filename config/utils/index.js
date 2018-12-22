'use strict'

//crypto-inbuilt module
const crypto = require('crypto');

//console loging
const logger = require('../logger');
//configurations
const config = require('../config');
//Mailer-NodeMialer
const nodeMailer = require('nodemailer');

const email = require('./emailTemplates');

//SendResponse Types possible
const FAIL = "fail";
const SERVER_ERROR = "server-error";
const SUCCESS = "success";
const UNKNOWN = 'unknown';
const UNPROCESSABLE_ENTITY = "unprocessable-entity";
const UNAUTHORIZED = 'unauthorized';
const BAD_REQUEST = 'bad-request';
const NOT_FOUND = 'not-found';






const utils = {
    sendResponse:function(response,operation,message,data,errors){
        var responseObj = {
            message: message || 'fail',
            success: false,
            data: data || undefined,
            errors: errors || undefined
        };
        var code = 400;
        operation = operation.toLowerCase();
        switch(operation){
            case FAIL:
                //error occured
                code =  403;
                responseObj.code = code;
               
                responseObj.message = message || "Some Error Occured try again later";
                response.json(responseObj);
                break;
            case SERVER_ERROR :
                //server-error
                code = 500
                responseObj.code = code;
                responseObj.message = message || "Internal server error";
                response.json(responseObj);
                break;
            case SUCCESS:
                //operation success
                code = 200;
                responseObj.code = code;
                responseObj.success = true;
                responseObj.message = message || "Successfull";
                response.json(responseObj);
                break;
            case UNPROCESSABLE_ENTITY : 
            //validation error
                code = 422;
                responseObj.code = code;
                responseObj.message = message || "Input Errors";
                response.json(responseObj);
                break;
            case NOT_FOUND:
                //unkonow 
                code = 404;
                responseObj.code = code;
                

                response.json(responseObj);
                break;
            case UNAUTHORIZED:
                //not authorized to access
                code = 401;
                responseObj.code = code;
                responseObj.message = 'You are unauthorized for this action';

                response.json(responseObj);
                break;
            case BAD_REQUEST:
                //bad request to url some error in inputs
                code =  400;
                responseObj.code = code;
               

                response.json(responseObj);
                break;
        }
    },
    createMail:function(data, type){
        logger.debug('config/utils createMail(data,type)',data,type)
        var that = this;
        var to = "";
        var text = "";
        var htmlBody = "";
        switch(type){
            case "forgotPassword":
                to = data.to;
                subject = email.forgotPassword.subject;
                data["heading"] = email.forgotPassword.heading;
                data["text"] = email.forgotPassword.text;
                data["preheading"] = email.forgotPassword.preheading;


                text = email.forgotPassword.text+ " \n Paste this in your browser" + data.url;
                            + "This mail was generted on your request to reset password.Ignore if not requested.";
                htmlBody = email.EMAIL_TEMPLATE( type,data );
                that.sendMail(to, subject, text, htmlBody);
                break;
            case "forgotUserName" :
                to = data.to;
                subject = email.forgotUserName.subject;
                text = "Please click this link to reset username "+ data.url;
                            + "This mail was generted on your request to reset username.Ignore if not requested.";
                htmlBody = email.EMAIL_TEMPLATE( type, data );
                that.sendMail(to, subject, text, htmlBody);
                break;
        }
    },
    sendMail:function(To,Subject,EmailText,Html_Body){
        
        logger.debug("config/utils sendMail(To,Subject,EmailText,Html_Body)",To,Subject,EmailText)
        var transporter = nodeMailer.createTransport({
            service: config.SMTP_SERVICE,
            auth: {
                user: config.SMTP_MAIL_ID,
                pass: config.SMTP_MAIL_PASS
            }
        });
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: config.COMPANY_NAME+ '<h='+config.SUPER_ADMIN_EMAIL+'>' , // sender address
            to: To, // list of receivers
            subject: Subject, // Subject line
            text: EmailText, // plaintext body
            html: Html_Body // html body
        };

    // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                logger.debug("config/utils Sending Mail Error",error);
                console.log('config/utils Sending Mail Error',error);
            }
            if (info != undefined) {
                logger.debug('config/utils Message Sent: ' + info.response);
                console.log('config/utils Message Sent: ' + info.response)
            } else {
                logger.debug("config/utils Error Sending Mail");
                console.log("config/utils Error Sening Mail");
            }
        });
    },
    randomStringGenerateId: function (x) {
        //instant import -randomString
        //UUID Generator
        const randomString = require("randomstring");
        //x is length of ID.
        return randomString.generate(x);
    },
    /*
    * generates random string of characters i.e salt
    * @function
    * @param {number} length - Length of the random string.
    */
   genRandomString : function(length){
     //to be used as salt for password encryptions

      logger.debug('config/utils encrypt genRandomString');
      return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex')     /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
    },   

    /*
    * hash password with sha512.
    * @function
    * @param {string} password - List of required fields.
    * @param {string} salt - Data to be validated.
    */
    sha512 : function(string, salt){
        logger.debug('config/utils encrypt sha512');
        try{
            var hash = crypto.createHmac('sha512', salt);
            hash.update(string);
            var value = hash.digest('hex'); /** Hashing algorithm sha512 */
        }
        catch(error){
            logger.error(error);
        }
        return {
            salt:salt,
            hash:value
        }
    },
};






module.exports = utils;
