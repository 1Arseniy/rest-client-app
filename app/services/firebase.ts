import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

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
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await user.reload();
    await user.getIdToken(true);
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      console.error(err.code, err.message);
      alert(err.message);
    } else {
      console.error(err);
      alert('An unexpected error occurred');
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
    await updateProfile(res.user, { displayName: name });

    await user.reload();
    await user.getIdToken(true);

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      createdAt: Date.now(),
    });
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      console.error(err.code, err.message);
      alert(err.message);
    } else {
      console.error(err);
      alert('An unexpected error occurred');
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
