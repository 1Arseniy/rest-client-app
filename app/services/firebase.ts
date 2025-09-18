import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';

import { showSonner } from '@/components/ui/sonner/sonner';
import type { RequestHistory, RequestHistoryResponse } from '@/types/types';

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
      showSonner('Error', err.message, 'error');
    } else {
      showSonner('Error', 'An unexpected error occurred', 'error');
    }
  }
};

const logout = () => {
  signOut(auth);
};

const saveRequestHistory = async (requestData: Omit<RequestHistory, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'requestHistory'), {
      ...requestData,
      errorDetails: requestData.errorDetails || null,
      createdAt: Date.now(),
    });
    return docRef.id;
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      showSonner('Error', err.message, 'error');
    } else {
      showSonner('Error', 'Failed to save request history', 'error');
    }
    throw err;
  }
};

const getRequestHistory = async (
  userId: string,
  limitCount: number = 50
): Promise<RequestHistoryResponse> => {
  try {
    const q = query(
      collection(db, 'requestHistory'),
      where('userId', '==', userId),
      orderBy('requestTimestamp', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const requests: RequestHistory[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      requests.push({
        id: doc.id,
        userId: data.userId,
        method: data.method,
        url: data.url,
        headers: data.headers || [],
        body: data.body || '',
        typeTextarea: data.typeTextarea || 'json',
        requestDuration: data.requestDuration || 0,
        responseStatusCode: data.responseStatusCode || 0,
        requestTimestamp: data.requestTimestamp || 0,
        requestSize: data.requestSize || 0,
        responseSize: data.responseSize || 0,
        errorDetails: data.errorDetails || null,
        endpoint: data.endpoint || '',
      });
    });

    return {
      requests,
      totalCount: requests.length,
    };
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      showSonner('Error', err.message, 'error');
    } else {
      showSonner('Error', 'Failed to fetch request history', 'error');
    }
    return { requests: [], totalCount: 0 };
  }
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  saveRequestHistory,
  getRequestHistory,
};
