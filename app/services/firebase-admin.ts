import admin from 'firebase-admin';
import type { RequestHistory } from '@/types/types';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();

export const saveRequestHistoryServer = async (
  requestData: Omit<RequestHistory, 'id'>
) => {
  try {
    const docRef = await adminDb.collection('requestHistory').add({
      ...requestData,
      errorDetails: requestData.errorDetails || null,
      createdAt: Date.now(),
    });
    return docRef.id;
  } catch (err) {
    console.error('Failed to save request history on server:', err);
    throw err;
  }
};
