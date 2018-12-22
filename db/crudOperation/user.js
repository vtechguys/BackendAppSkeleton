'use stict'
const User = require('../model/User');

//utils import
const config = require('../../config');
const logger = config.logger;
//just this time arround - login,register
const responseType = config.responseTypes;
const dbOperations = {

    // one time use not neccessary callback -return call
    doLogin:function(loginObj,response){
        logger.debug('Logging in th user.');
        const utils = require('../../config/utils');
        const messages = require('../../routes/config/routesMessage');

        let mobileId = loginObj.loginId;
        if(loginObject.loginId.length!=10 || loginObject.loginId.startsWith("+91")){
            mobileId = "XXXXXXXXXXXXXXX";
        }
        User.find({
            "$or":[
                { "userId": loginObj.loginId },
                { "userName": loginObj.loginId },
                { "mobile": { "$regex": mobileId } }
            ]
        },function(error,results){
            if(error){
                logger.error('Error',error);
            }
            else{
                logger.debug('crud results');
                if(results.length<1){
                    //No User
                    utils.sendResponse(response, responseType.NOT_FOUND, messages.login.userDoesNotExist);
                }
                else{
                    let i = 0;
                    let noOfUsers = 0;
                    let sessionData;
                    while(i<results.length){
                        if(results[i].salt===undefined){
                            i++;
                        }
                        else{
                            let salt = results[i].salt;
                            let encryptPwsdSHA = utils.sha512(loginObj.password,salt);
                            let encryptPwsd = encryptPwsdSHA.hash;
                            if( results[i].password === encryptPwsd ){
                                results[i].rememberMe = loginObj.rememberMe;
                                noOfUsers = noOfUsers + 1;
                                sessionData = results[i];
                            }
                            i++;
                        }
                    }
                    if(noOfUsers===1){
                        utils.sendResponse(response, responseType.SUCCESS, messages.login.successFullLoggedIn,{"seesionData":sessionData});
                    }
                    else if(noOfUsers>1){
                        utils.sendResponse(response, responseType.BAD_REQUEST, messages.login.conflictAccountCredentials);
                    }
                    else{
                        utils.sendResponse(response, responseType.NOT_FOUND, messages.login.userDoesNotExist );
                    }

                }
            }
        });
        
    }

};

modules.exports = dbOperations;