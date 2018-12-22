const LoginErrors = {
    //Invalid fields
    loginIdInvalid: 'LoginId field is not valid.',
    passwordInvalid: 'Password field is not valid.',
    //Required fields
    passwordRequired: 'Password field is required.',
    loginIdRequired: 'LoginId field is required.'
};
const LoginMsg = {

    successFullLoggedIn:'Successfully loggedIn.',
    userDoesNotExist: 'User doesnot exist.',
    errors: LoginErrors

};
const RegisterErrors = {
    //Invalid fields
    emailInvalid: 'Email field is not valid.',
    userNameInvalid: 'Username field is not valid.',
    passwordInvalid:'Password field is not valid.',
    latInvalid: 'Latitude field is not valid.',
    lngInvalid: 'Longitude field is not valid.',
    areaInvalid: 'Area field is not valid.',
    stateInvalid: 'State field is not valid.',
    cityInvalid: 'City field is not valid.',
    pincodeInvalid: 'Pincode field is not valid.',
    countryInvalid: 'Country field is not valid.',
    firstNameInvalid: 'First Name field is not valid.',
    lastNameInvalid: 'Last Name field is not valid.',
    genderInvalid: 'Gender field is not valid.',
    mobileInvalid: 'Mobile field is not valid.',
    codeInvalid: 'Code field is not valid.',
    //Requireds fields
    emailRequired:'Email is required.',
    userNameRequired: 'Username is required.',
    passwordRequired: 'Password is required',
    firstNameRequired: 'First Name is required.',
    lastNameRequired: 'Last Name is required.',
    genderRequired:'Gender is required.',
    mobileRequied: 'Mobile is required.',
    codeRequired: 'Code is required.'
};
const RegisterMsg = {
    successFullRegister: 'Successfully registerd.',

    errors:RegisterErrors
};
const formInputErrors = 'Input Errors.';

const ImageUploadMsg = {
    invalidType: 'Invalid Image MIME type.',
    successfullUpload: 'Successfull upload.'
};

const Messages = {

    formInputErrors: formInputErrors,
    login: LoginMsg,
    register: RegisterMsg,
    imageUpload: ImageUploadMsg


};

module.exports = Messages;

