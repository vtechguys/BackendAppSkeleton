'use strict'
if(process.env.NODE_ENV==="production"){
    module.exports = require('./schema_prod');
}
else{
    module.exports = require('./schema_dev.js');
}