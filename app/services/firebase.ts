import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import { showSonner } from '@/components/ui/sonner/sonner';

const firebaseConfig = {
  apiKey: 'AIzaSyAqbgEqacnW2Bt8gNT1dYSs6dTvID1SNP0',
  authDomain: 'ksenia-f3f87.firebaseapp.com',
  projectId: 'ksenia-f3f87',
  storageBucket: 'ksenia-f3f87.firebasestorage.app',
  messagingSenderId: '1044269212733',
  appId: '1:1044269212733:web:5c099d7d85f152ffad7654',
  measurementId: 'G-Z8VF9THMGZ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      showSonner('Error', err.message, 'error');
    } else {
      showSonner('Error', 'An unexpected error occurred', 'error');
    }
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      showSonner('Error', err.message, 'error');
    } else {
      showSonner('Error', 'An unexpected error occurred', 'error');
    }
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
