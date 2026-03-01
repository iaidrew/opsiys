import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

console.log("ENV CHECK:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountRaw) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is undefined");
}

const serviceAccount = JSON.parse(serviceAccountRaw);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();