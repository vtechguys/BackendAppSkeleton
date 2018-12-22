'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config');
const schemaNames = config.schemaNames;


const UserSchema = new Schema({
    //unique to a user
    userId:{
        type:String,
        unique:true,
        required:true
    },
    userEmail:{
        type:String,
        unique:true,
        required:true
    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    emailActivationToken:{
        type:String
    },
    userName:{ type:String, unique: true, required: true },
    
    
    

    //Address
    address:{
        country: String,
        state:String,
        area: String,
        city: String,
        a: String,//address
        pincode: String
    },

    
    //password
    password: String,
    salt:String,
    forgotPasswordToken: String,
    passwordTokenTimeStamp: Date,//password token when issued -timestamp


    //mobile
    countryCode:String,
    mobile:{ type: String, unique: true, sparse: true },
    tempMobile:String,//This becomes mobile No. later once verified
    mobileVerified:{ type:Boolean, default: false },
    mobileVerificationCode: String,
    mobileTokenStamp: Date,//When was mobile verified/changed timestamp.


    //userInfo
    firstName: String,
    lastName: String,
    bio: String,
    gender: String,
    role:String,
    social: [
        {
          connection: String,
          sId: String,
          accessToken: String
        }
    ],
    geoLocation: {
        type: { type: String },
        coordinates: [Number]
    },
    profilePic: String,
    socialLinks:[
      {
        social:String,
        link:String
      }
    ],
    profileUrl: String,
    paymentDetails: {
        paytm: String,
        bankDetails: {
            ifsc: String,
            bankName: String,
            accountNumber: String,
            accountHolderName:String,
            accountType:String
    
        }
      },










    //registration date
    registrationDate: Date



});

UserSchema.index({ userId: 1 });
UserSchema.index({ userName: 1 });

const User = mongoose.model( schemaNames.userCollection, UserSchema);

module.exports = User;