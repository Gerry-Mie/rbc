const functions = require('firebase-functions')
const admin = require('firebase-admin')


module.exports = functions.https.onCall(async (data) => {

    const auth = admin.auth()
    const firestore = admin.firestore()

    const user = await auth.createUser({
        email: data.email,
        password: 'rbc123',
    })
    await auth.setCustomUserClaims(user.uid, {admin: true})
    await firestore.collection('members').doc(data.docId).set({ uid: user.uid}, {merge: true})

})
