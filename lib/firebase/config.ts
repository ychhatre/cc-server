
import * as admin from "firebase-admin"; 

const serviceAccount = require("./clubcentral-key.json"); 
if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const db = admin.firestore();
export const auth = admin.auth(); 
export const storage = admin.storage(); 
export const messaging = admin.messaging(); 