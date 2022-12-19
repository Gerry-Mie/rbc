const functions = require("firebase-functions");
const admin = require('firebase-admin')

admin.initializeApp()

/** add member */
exports.addMember = require('./onCall/addMember')

/** create  account for member */
exports.createUser = require('./onCall/createUser')
