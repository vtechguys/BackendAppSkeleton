'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config');
const schemaNames = config.schemaNames;

const RoleSchema = new Schema({
    roleId:{ type: String, unique: true, required: true },
    role: { type: String, unique: true, required: true },
    rights:[{
        name: String,
        path: String,
        url: String
    }]


});

const Role = mongoose.model(schemaNames.rolesCollection, RoleSchema);
module.exports = Role;