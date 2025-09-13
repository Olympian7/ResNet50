import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  "projectId": "studio-498700326-2afa2",
  "appId": "1:639279667384:web:8c087a0cdc4546e8667c4d",
  "storageBucket": "studio-498700326-2afa2.firebasestorage.app",
  "apiKey": "AIzaSyDosAwz4or-TVXDLcAu3kEy0IcZUCa5baI",
  "authDomain": "studio-498700326-2afa2.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "639279667384"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { app };
