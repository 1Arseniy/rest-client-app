import admin from 'firebase-admin';
import type { RequestHistory } from '@/types/types';

// Initialize Firebase Admin only if not already initialized
// This prevents errors on Vercel if credentials are not available
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (error) {
    // Log error but don't throw - allows app to continue if Firebase Admin is not configured
    // This is important for Vercel deployments where credentials might not be set up
    console.warn('Firebase Admin initialization failed:', error);
  }
}

export const adminAuth = admin.apps.length > 0 ? admin.auth() : null;
export const adminDb = admin.apps.length > 0 ? admin.firestore() : null;

export const saveRequestHistoryServer = async (
  requestData: Omit<RequestHistory, 'id'>
) => {
  if (!adminDb) {
    throw new Error('Firebase Admin is not initialized');
  }
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

export const getRequestHistoryServer = async (
  userId: string,
  limitCount: number = 50
) => {
  if (!adminDb) {
    throw new Error('Firebase Admin is not initialized');
  }
  try {
    const snapshot = await adminDb
      .collection('requestHistory')
      .where('userId', '==', userId)
      .orderBy('requestTimestamp', 'desc')
      .limit(limitCount)
      .get();

    const requests: RequestHistory[] = [];

    snapshot.forEach((doc) => {
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
  } catch (err) {
    console.error('Failed to get request history on server:', err);
    throw err;
  }
};
