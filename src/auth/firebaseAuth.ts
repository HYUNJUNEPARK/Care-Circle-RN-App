import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from '@env';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
};

// Firebase 앱이 이미 초기화되어 있으면 재초기화하지 않음
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (e) {
    // 이미 초기화된 경우 에러 무시
    // @ts-ignore
    app = initializeApp.getApps ? initializeApp.getApps()[0] : null;
}

export const firebaseApp = app;
export const auth = getAuth(app);
