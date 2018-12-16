if(process.env.NODE_ENV === 'production'){
    module.exports = require('./awsConfig_prod');
}
else{
    module.exports = require('./awsConfig_dev');
}
