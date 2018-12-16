'use strict'

//Express and Router
const express = require('express');
//Router Obj inst
const router = express.Router();


//configurations
const config = require('../../config');
//logger
const logger = config.logger;
//utils
const utils = config.utils;
//responseTypes possible
const responseType = config.responseTypes;



//lodash
const _ = require('../../utils/loadash');
//validation
const validate = require('../../utils/validate');




//@route POST /users/login
//@description login a user using MailId,MobileNo,Username
//@access Public route
router.post('/login', (request, response)=>{
    logger.debug('routes/api/users.js. POST /users/login.');

    const body = _.pick(request.body,["loginId","password"]);

    let isValidEmail = false;
    let isValidMobile = false;
    let isValidUsername = false;

    let isValidLoginId = false;
    let isValidPassword = false;
    if(body.loginId){
        isValidEmail = validate.email(body.loginId);
        isValidMobile = validate.mobile(body.loginId);
        isValidUsername = validate.username(body.username);
        //loginId is one of above then it true
        isValidLoginId = isValidEmail || isValidMobile || isValidUsername;
    }
    if(body.password){
        isValidPassword = validate.password(body.password);
    }
    
    if(isValidLoginId && isValidPassword){
        //DBCall
        console.log("DBCall");
    }
    else{
        const errors = {};
        errors["loginId"] = !isValidLoginId ? "Invalid LoginId" : undefined;
        errors["password"] = !isValidPassword ? "Invalid Password" : undefined;
        utils.sendResponse(response,responseType.BAD_REQUEST,'Invalid Inputs',null,errors);
    }

});



//@route POST /users/register
//@description register a user using email
//@access Public route
router.post('/register', (request, response)=>{
    const body = _.pick(request.body,["email","username","password","address","location","firstName","lastName","gender","mobile","code","connection","sId","accessToken"]);

    let isValidEmail = false;
    let isValidUsername = false;
    let isValidPassword = false;
    //Address
    let isValidArea = true;
    let isValidState = true;
    let isValidCity = true;
    let isValidPincode = true;
    let isValidCounrty = true;
    //location
    let isValidLat = true;
    let isValidLng = true;
    //general
    let isValidFname = false;
    let isValidLname = false;
    let isValidGender = false;
    let isValidMobile = false;
    let isValidCcode = false;
    //links
    let isConnection = true;
    let isSid = true;
    let isAccessToken = true;

    body["social"] = [];
    let socialObj = {};
    if(body.connection){
        socialObj["connection"] = body.connection;
    }
    if(body.sId){
        socialObj["sId"] = body.sId;
    }
    if(body.accessToken){
        socialObj["acccessToken"] = body.acccessToken;
    }
    body.social.push(socialObj);


    //validations

    //errorsObj
    const errors = {};
    
    

    if(body.email){
        body["email"] = body.email.toLowerCase();
        isValidEmail = validate.email(body.email);

    }
    if(!isValidEmail){
        errors["email"] = "Invalid Email";
    }

    if(body.username){
        body["username"] = body.username.toLowerCase();
        isValidUsername = validate.username(body.username);
    }
    if(!isValidUsername){
        errors["username"] = "Invalid UserName";
    }

    if(body.password){
        isValidPassword = validate.password(body.password);
    }
    if(!isValidPassword){
        errors["password"] = "Invalid Password";
    }
    //location
    if(!body.location || !body.location.latitude){
        isValidLat = true;
    }
    else{
        isValidLat = !isNaN(body.location.latitude);
        if(!isValidLat){
            errors["latitude"] = "Invalid latitude";
        }
    }

    if(!body.location || !body.location.longitude){
        isValidLng = true;
    }
    else{
        isValidLng = !isNaN(body.location.longitude);
        if(!isValidLng){
            errors["longitude"] = "Invalid longitude";
        }
    }

    //address

    if(!body.address || !body.address.area){
        isValidArea = true;
    }
    else{
        isValidArea = validate.string(body.address.area);
        if(!isValidArea){
            errors["area"] = "Invalid Area";
        }
    }

    if(!body.address || !body.address.state){
        isValidState = true;
    }
    else{
        isValidState = validate.string(body.address.state);
        if(!isValidState){
            errors["state"] = "Invalid State";
        }
    }

    if(!body.address || !body.address.city){
        isValidCity = true;
    }
    else{
        isValidCity = validate.string(body.address.city);
        if(!isValidCity){
            errors["city"] =  "Invalid City";
        }
    }

    if(!body.address || !body.address.pincode){
        isValidPincode = true;
    }
    else{
        isValidPincode = validate.number(body.address.pincode);
        if(!isValidPincode){
            errors["pincode"] = "Invalid Pincode";
        }
    }

    if(!body.address || !body.address.country){
        isValidCounrty = true;
    }
    else{
        isValidCounrty = validate.string(body.country);
        if(!isValidCounrty){
            errors["country"] = "Invalid Country";
        }
    }
    //general
    if(body.firstName){
        isValidFname = validate.name(body.firstName);
    }
    if(!isValidFname){
        errors["firstName"] = "Invalid FirstName";
    }

    if(body.lastName){
        isValidLname = validate.name(body.lastName);
    }
    if(!isValidLname){
        errors["lastName"] = "Invalid LastName";
    }

    if(body.gender){
        isValidGender = validate.gender(body.gender);
    }
    if(!isValidGender){
        errors["gender"] = "Invalid Gender";
    }

    if(body.mobile){
        isValidMobile = validate.mobile(body.mobile);
    }
    if(!isValidMobile){
        errors["mobile"] = "Invalid Mobile No.";
    }

    if(body.code){
        isValidCcode = validate.code(body.code);
    }
    if(!isValidCcode){
        errors["code"] = "Invalid Code";
    }
    utils.sendResponse(response,responseType.SUCCESS,'register',{"data":"Data"},errors);
});
module.exports = router;
