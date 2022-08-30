import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyB2r52LwAcnjpCLyYSiPme4Ax_mPWb_IxY',
  authDomain: 'transfire-it.firebaseapp.com',
  projectId: 'transfire-it',
  storageBucket: 'transfire-it.appspot.com',
  messagingSenderId: '670504118319',
  appId: '1:670504118319:web:07c3afc2518f0b334e7eda',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
