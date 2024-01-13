import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";


const fileCredentials  = path.join(process.cwd(),process.env.GOOGLE_APPLICATION_BOOK||'')

initializeApp({
  credential: credential.cert(require(fileCredentials)),
});
export const db = getFirestore();
