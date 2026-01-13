// Config for Firebase Admin SDK, used for backend calls

const admin = require("firebase-admin");

// Check if a Firebase Admin app is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
} else {
  admin.app(); // If already initialized, use that one
}

const db = admin.firestore();

module.exports = { db };
