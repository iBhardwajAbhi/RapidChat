import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'xxxxx',
  authDomain: 'xxxxx.firebaseapp.com',
  projectId: 'reactjs-chat-xxxx',
  storageBucket: 'reactjs-chat-xxxx.appspot.com',
  messagingSenderId: 'xxxxxxxx',
  appId: '1:xxxxxx:web:xxxxxxx',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
