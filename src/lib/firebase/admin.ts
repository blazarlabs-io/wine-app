import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getFunctions } from "firebase-admin/functions";

// const serviceAccountKey = require("../../../serviceAccountKey.json");
const serviceAccountKey = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SERVICE_ACCOUNT as string
);

let adminApp;

// initialize admin firebase only once
if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert({
      projectId: serviceAccountKey.project_id,
      clientEmail: serviceAccountKey.client_email,
      privateKey: serviceAccountKey.private_key.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminAuth = getAuth();
export const adminDB = getFirestore();
export const adminFunctions = getFunctions(adminApp);
