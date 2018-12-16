'use strict'
/**
 * Holds config for all files inside this folder(~/config)
 * Only files which required configuration inside this folder are held here.
 */
const config = {

    LOGGER_TYPE: process.env.LOGGER_TYPE,
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_MAIL_ID: process.env.SMTP_MAIL_ID,
    SMTP_MAIL_PASS: process.env.SMTP_MAIL_PASS,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
    COMPANY_NAME: process.env.COMPANY_NAME

}
module.exports = config;