'use strict';

const validate = {

    username: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z0-9._]+$/;
        if (string.length < 5 || string.length > 20 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    password: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var letters = /(?=^.{6,25}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
        if (string.length <8 || string.length >25 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    email: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var comValid=true;
        var atpos = string.indexOf("@");
        var dotpos = string.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= string.length) {
            comValid=false;
        }
        var letters = /^[A-Z0-9a-z!@#$%&*+-/=?^_`'{|}~]+$/;
        if (string.length < 5 || string.length > 100 || string.match(letters) === null || string.match("@") === null || comValid===false) {
            return false;
        }
        else {
            return true;
        }
    },
    mobile: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var letters = /^[0-9]+$/;
        if (string.length != 10 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    number: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var letters = /^[0-9]+$/;
        if (string.length < 3 || string.length > 15 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    string: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z0-9-/_',.:@| ]+$/;
        if (string.length < 3 || string.length > 1000 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    name: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z ]+$/;
        if (string.length < 3 || string.length > 50 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    code: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z0-9+]+$/;
        if (string.length < 2 || string.length > 16 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    id: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z0-9]+$/;
        if (string.length < 4 || string.length > 32 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    gender: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        if (string !== 'male' && string !== 'female' && string !== 'other') {
            return false;
        }
        else {
            return true;
        }
    },
    longString: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        
        var string = string.trim();
        var letters = /^[A-Za-z0-9-/_',.:+#&=%()^*!@$[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D] ]+$/;
        if (string.length < 2 || string.length > 5000 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    stringArray: function (array) {
        var that = this;
        if (!array || array.length < 1 || array.length > 50) {
            return false;
        }
        var valid = true;
        for (var i = 0; i < array.length; i++) {
            valid = that.string(array[i]);
            if (valid != true) {
                break;
            }
        }
        return valid;
    },
    tagArray: function (array) {
        var that = this;
        if (!array || array.length < 0 || array.length > 100) {
            return false;
        }
        var valid = true;
        for (var i = 0; i < array.length; i++) {
            valid = that.string(array[i]);
            if (valid != true) {
                break;
            }
        }
        return valid;
    },
    stringObjectArray: function (array) {
        var that = this;
        if (!array || array.length < 1 || array.length > 1000 || array.length == undefined) {
            return false;
        }
        var allProperty = {
            valid:true
        };
        for (var i = 0; i < array.length; i++) {
            Object.keys(array[i]).forEach(function (key) {
                var valid = that.string(array[i][key]);
                if (valid != true) {
                    allProperty.valid = false;
                }
            });
            if(allProperty.valid === false){
                break;
            }
        }
        return allProperty.valid;
    },

    objectArray: function (array) {
        console.log('validate stringObjectArray');
        var that = this;
        if (!array || array.length < 1 || array.length > 1000 || array.length == undefined) {
            return false;
        }
        var allProperty = {
            valid:true
        };
        for (var i = 0; i < array.length; i++) {
            Object.keys(array[i]).forEach(function (key) {
                var valid = (typeof(array[i][key]) === "string" || (array[i][key] instanceof Array=== true))
                
                if (valid != true) {
                    allProperty.valid = false;
                }
            });
            if(allProperty.valid === false){
                break;
            }
        }
        return allProperty.valid;
    },



    stringObject:function (obj){
        console.log('validate stringObject');
        var that = this;
        if(obj){
            var allProperty = {
                valid:true
            };
            Object.keys(obj).forEach(function (key) {
                var valid = that.string(obj[key]);
                if (valid != true) {
                    allProperty.valid = false;
                }
            });
            return allProperty.valid;
        }
        else{
            return false;
        }
    },
    complexString: function (string) {
        console.log('validate string');
        if (string === undefined) {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z0-9-/_',.!@#$%&?:*()+=|\x22 ]+$/;
        if (string.length < 2 || string.length > 5000 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    idArray: function (array) {
        console.log('validate idArray');
        var that = this;
        if (!array || array.length < 1 || array.length > 30) {
            return false;
        }
        var valid = true;
        for (var i = 0; i < array.length; i++) {
            valid = that.id(array[i]);
            if (valid != true) {
                break;
            }
        }
        return valid;
    },
    date:function(date){
        if (Object.prototype.toString.call(date) === "[object Date]") {
            // it is a date
            if (isNaN(date.getTime())) {  
              // date is not valid
              return false;
            } 
            else {
              // date is valid
              return true;
            }
        } 
        else {
            // not a date
            return false;
        }
    }
};

module.exports = validate;
