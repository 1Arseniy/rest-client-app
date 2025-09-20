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

export const getRequestHistoryServer = async (
  userId: string,
  limitCount: number = 50
) => {
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
