import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyClfejW0YHd8bF3jV_L-TjNgkyXxomEuPU",
  authDomain: "phyo-deli-backend.firebaseapp.com",
  projectId: "phyo-deli-backend",
  storageBucket: "phyo-deli-backend.appspot.com",
  messagingSenderId: "68881654411",
  appId: "1:68881654411:web:65b1c3981b9d980c1f2a8e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
