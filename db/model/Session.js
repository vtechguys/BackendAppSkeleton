const mongooose = require('mongoose');
const Schema = mongooose.Schema;

const config = require('../../config');
const schemaNames = config.schemaNames;

const SessionSchema = new Schema({
    sessionId: { type: String, unique: true, required: true },
    uuid: { type:String, required:true },
    objectId: String,
    userId: String,
    userEmail: String,
    userName: String,
    role: String,
    emailVerified: Boolean,
    temporaryMobile: String,
    mobile: String,
    countryCode: String,
    mobileVerified: Boolean,
    profilePic:String,

    address:
    {   
        country: String,
        state: String,
        area: String,
        city: String,
        pincode: String,
    },
    firstName: String,
    lastName: String,
    bio:String,
    gender: String,
    geoLocation: {
        type: { type: String },
        coordinates: [Number]
    },
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
    registrationDate: Date,

    createdAt:{type:Date,expires:"30d",default:Date.now},

});

const Session = mongooose.model(schemaNames.sessionCollection, SessionSchema);
module.exports = Session;