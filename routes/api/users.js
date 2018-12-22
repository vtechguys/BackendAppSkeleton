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
const utils = require('../../config/utils');
//responseTypes possible
const responseType = config.responseTypes;



//lodash
const _ = require('../../utils/loadash');
//validation
const validate = require('../../utils/validate');

//Message as routes responses
const messages = require('../config/routesMessage');



//@route POST /users/login
//@description login a user using MailId,MobileNo,Username
//@access Public route
router.post('/login', (request, response)=>{
    logger.debug('User loggingIn');

    const body = _.pick(request.body,["loginId","password"]);

    let isValidEmail = false;
    let isValidMobile = false;
    let isValidUsername = false;

    let isValidLoginId = false;
    let isValidPassword = false;

    let errors = {};

    if(body.loginId || body.loginId===""){
        isValidEmail = validate.email(body.loginId);
        isValidMobile = validate.mobile(body.loginId);
        isValidUsername = validate.username(body.username);
        //loginId is one of above then it true
        isValidLoginId = isValidEmail || isValidMobile || isValidUsername;
        if(!isValidLoginId){
            errors["loginId"] = messages.login.errors.loginIdInvalid;
        }
    }
    else{
        errors["loginId"] = messages.login.errors.loginIdRequired;
    }
    if(body.password || body.password===""){
        isValidPassword = validate.password(body.password);
    }
    else{
        errors["password"] = messages.login.errors.passwordRequired;
    }
    if(isValidLoginId && isValidPassword){
        //DBCall
        console.log("DBCall");
        utils.sendResponse(response, responseType.SUCCESS, messages.login.successFullLoggedIn);
    }
    else{
        //errors["loginId"] = !isValidLoginId ? messages.login.errors.loginIdInvalid : undefined;
        // errors["password"] = !isValidPassword ? messages.login.errors.passwordInvalid : undefined;
        utils.sendResponse(response,responseType.BAD_REQUEST,messages.formInputErrors,null,errors);
    }

});



//@route POST /users/register
//@description register a user using email
//@access Public route
router.post('/register', (request, response)=>{
    logger.debug('routes/api/users.js.Register a user');
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
    let errors = {};
    
    // console.log(body)

    if(body.userEmail || body.userEmail===""){
        body["email"] = body.userEmail.toLowerCase();
        isValidEmail = validate.email(body.userEmail);
        if(!isValidEmail){
            errors["email"] = messages.register.errors.emailInvalid;
        }
    }
    else{
        errors["email"] = messages.register.errors.emailRequired;
    }
    

    if(body.userName || body.userName===""){
        body["userName"] = body.userName.toLowerCase();
        isValidUsername = validate.username(body.userName);
        if(!isValidUsername){
            errors["userName"] = messages.register.errors.userNameInvalid;
        }
    
    }
    else{
        errors["userName"] = messages.register.errors.userNameRequired

    }
    
    if(body.password || body.password===""){
        isValidPassword = validate.password(body.password);
        if(!isValidPassword){
            errors["password"] = messages.register.errors.passwordInvalid;
        }
    }
    else{
        errors["password"] = messages.register.errors.passwordRequired;
    }
    
    //location
    if(!body.location || !body.location.latitude){
        isValidLat = true;
    }
    else{
        isValidLat =( typeof(body.location.latitude) === "number"  && !isNaN(body.location.latitude) );
        if(!isValidLat){
            errors["latitude"] = messages.register.errors.latInvalid;
        }
    }

    if(!body.location || !body.location.longitude){
        isValidLng = true;
    }
    else{
        isValidLng = ( typeof(body.location.longitude)==="number" && !isNaN(body.location.longitude) );
        if(!isValidLng){
            errors["longitude"] = messages.register.errors.lngInvalid;
        }
    }

    //address

    if(!body.address || !body.address.area){
        isValidArea = true;
    }
    else{
        isValidArea = validate.string(body.address.area);
        if(!isValidArea){
            errors["area"] = messages.register.errors.areaInvalid;
        }
    }

    if(!body.address || !body.address.state){
        isValidState = true;
    }
    else{
        isValidState = validate.string(body.address.state);
        if(!isValidState){
            errors["state"] = messages.register.errors.stateInvalid;
        }
    }

    if(!body.address || !body.address.city){
        isValidCity = true;
    }
    else{
        isValidCity = validate.string(body.address.city);
        if(!isValidCity){
            errors["city"] =  messages.register.errors.cityInvalid;
        }
    }

    if(!body.address || !body.address.pincode){
        isValidPincode = true;
    }
    else{
        isValidPincode = validate.number(body.address.pincode);
        if(!isValidPincode){
            errors["pincode"] = messages.register.errors.pincodeInvalid;
        }
    }

    if(!body.address || !body.address.country){
        isValidCounrty = true;
    }
    else{
        isValidCounrty = validate.string(body.address.country);
        if(!isValidCounrty){
            errors["country"] = messages.register.errors.countryInvalid;
        }
    }
    //general
    if(body.firstName || body.firstName===""){
        isValidFname = validate.name(body.firstName);
        if(!isValidFname){
            errors["firstName"] = messages.register.errors.firstNameInvalid;
        }
    }
    else{
        errors["firstName"] = messages.register.errors.firstNameRequired;
    }
    

    if(body.lastName || body.lastName===""){
        isValidLname = validate.name(body.lastName);
        if(!isValidLname){
            errors["lastName"] = messages.register.errors.lastNameInvalid;
        }
    }
    else{
        errors["lastName"] = messages.register.errors.lastNameRequired;
    }
    

    if(body.gender || body.gender===""){
        isValidGender = validate.gender(body.gender);
        if(!isValidGender){
            errors["gender"] = messages.register.errors.genderInvalid;
        }
    }
    else{
        errors["gender"] = messages.register.errors.genderRequired;
    }
    

    if(body.mobile || body.mobile===""){
        isValidMobile = validate.mobile(body.mobile);
        if(!isValidMobile){
            errors["mobile"] = messages.register.errors.mobileInvalid;
        }
    }
    else{
        errors["mobile"] = messages.register.errors.mobileRequied;
    }
    

    if(body.code || body.code===""){
        isValidCcode = validate.code(body.code);
        if(!isValidCcode){
            errors["code"] = messages.register.errors.codeInvalid;
        }
    }
    else{
        errors["code"] = messages.register.errors.codeRequired;
    }
    
    utils.sendResponse(response,responseType.SUCCESS,messages.register.successfullRegister,null,errors);
});



//@route POST /users/upload-pic
//@description upload user profile pic
//@access Public route
router.post('/upload-pic',(request, response)=>{
    logger.debug('upload user profile picture');

    //inst aws and busboy
    const awsOperations = require('../../config/aws');
    const BusBoy = require('busboy');

    var data = {};
    var busboy = new BusBoy({ headers: request.headers });

    try{
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
            data["userId"] = request.userData.userId;
            logger.debug('filedname:', fieldname.trim() + " filename:" + mimetype);
            if (fieldname.trim() != 'image' || !(mimetype.includes('image/'))) {
                logger.debug('invalid mimetype');
                return utils.sendResponse(response,responseType.BAD_REQUEST,messages.imageUpload.invalidType);
            }
            console.log("bussboy okay")
            const config = require('../../config');
            awsOperations.s3Upload(config.AWS_BUCKET_Profile, file, 'profile/'+'profile-' + data.userId + '.jpeg', (error, result)=>{
                console.log("aws okay",error,result)
                if(error){
                    logger.debug(error);
                    utils.sendResponse(response,responseType.FAIL);
                }
                else{
                    logger.debug(result);
                    let URL_IMAGE = config.AWS_CLOUDFRONT_URL + '/profile/'+'profile-' + data.userId + '.jpeg';
                    utils.sendResponse(response,responseType.SUCCESS,messages.imageUpload.successfullUpload);
                    // dbOperations.updateProperty(data.userId, 'profileImage', URL_IMAGE, (error1, result1)=>{
                    //     if(error1){
                    //         logger.error(error1);
                    //         utils.sendResponse(response,responseType.FAIL);
                    //     }
                    //     else{
                    //         if(!result1){
                    //             logger.debug('user not found');
                    //             utils.sendResponse(response,responseType.NOT_FOUND,'User not found');
                    //         }
                    //         else{
                    //             logger.debug('imageuploaded at',result1.profileImage);
                    //             utils.sendResponse(response,responseType.SUCCESS,'Uploaded Image Successfully');
                    //         }
                    //     }
                    // })
                }
            });

        })
    }
    catch( exp ){
        logger.debug('error:',exp)
        utils.sendResponse(response,responseType.FAIL);

    }
    
    busboy.on('finish', function () {
        logger.debug('Upload picture complete finish-busboy');
    });

    return request.pipe(busboy);



});




module.exports = router;
