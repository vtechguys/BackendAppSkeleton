const LoginErrors = {
    loginIdInvalid: 'LoginId is not valid',
    passwordInvalid: 'Password field is not valid',
    passwordRequired: 'Password field is required',
    loginIdRequired: 'LoginId field is required'
};
const LoginMsg = {

    successFullLoggedIn:'Successfully loggedIn',
    userDoesNotExist: 'User doesnot exist',
    errors: LoginErrors

};
const RegisterMsg = {
    successFullRegister: 'Successfully registerd'
};
const formInputErrors = 'Input Errors';

const ImageUploadMsg = {
    invalidType: 'Invalid Image MIME type',
    successfullUpload: 'Successfull upload'
};

const Messages = {

    formInputErrors: formInputErrors,
    login: LoginMsg,
    register: RegisterMsg,
    imageUpload: ImageUploadMsg


};

module.exports = Messages;

