import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { app };
