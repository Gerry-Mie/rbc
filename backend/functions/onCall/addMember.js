const yup = require('yup')
const functions = require("firebase-functions");
const admin = require('firebase-admin')

const memberSchema = yup.object({
    firstname: yup.string().required().min(2),
    lastname: yup.string().required().min(2),
    type: yup.string().required(),
    dob: yup.string().required('Date of Birth is Required'),
    contactNumber: yup.string(),
    email: yup.string(),
    address: yup.string(),
})


module.exports = functions.https.onCall(async (data, context) => {

    try {
        memberSchema.validate(data)
    } catch (error) {
        return {error, success: false}
    }
    const firestore = admin.firestore()

    const memberDoc = firestore.collection('members').doc()

    await memberDoc.set({...data, docId: memberDoc.id})

    return {success: true}
})
