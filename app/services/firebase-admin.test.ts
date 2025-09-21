import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { RequestHistory } from '@/types/types';

const hoisted = vi.hoisted(() => {
  const addMock = vi.fn();
  const whereMock = vi.fn();
  const orderByMock = vi.fn();
  const limitMock = vi.fn();
  const getMock = vi.fn();
  const collectionMock = vi.fn(() => ({
    add: addMock,
    where: whereMock.mockReturnThis(),
    orderBy: orderByMock.mockReturnThis(),
    limit: limitMock.mockReturnThis(),
    get: getMock,
  }));

  return {
    addMock,
    whereMock,
    orderByMock,
    limitMock,
    getMock,
    collectionMock,
  };
});

vi.mock('firebase-admin', () => {
  return {
    default: {
      apps: [],
      initializeApp: vi.fn(),
      credential: { applicationDefault: vi.fn() },
      auth: vi.fn(),
      firestore: () => ({
        collection: hoisted.collectionMock,
      }),
    },
  };
});

import {
  saveRequestHistoryServer,
  getRequestHistoryServer,
} from './firebase-admin';

describe('firebase-admin service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saveRequestHistoryServer - successfully save and return id', async () => {
    const fakeId = 'doc123';
    hoisted.addMock.mockResolvedValueOnce({ id: fakeId });

    const requestData: Omit<RequestHistory, 'id'> = {
      userId: 'user1',
      method: 'GET',
      url: '/api/test',
      headers: [],
      body: '',
      typeTextarea: 'json',
      requestDuration: 120,
      responseStatusCode: 200,
      requestTimestamp: Date.now(),
      requestSize: 100,
      responseSize: 200,
      errorDetails: null,
      endpoint: '/api/test',
    };

    const result = await saveRequestHistoryServer(requestData);

    expect(hoisted.collectionMock).toHaveBeenCalledWith('requestHistory');
    expect(result).toBe(fakeId);
  });

  it('getRequestHistoryServer - return list of requests', async () => {
    const fakeDocs = [
      {
        id: '1',
        data: () => ({
          userId: 'user1',
          method: 'GET',
          url: '/api/test',
          headers: [],
          body: '',
          typeTextarea: 'json',
          requestDuration: 120,
          responseStatusCode: 200,
          requestTimestamp: 123456,
          requestSize: 100,
          responseSize: 200,
          errorDetails: null,
          endpoint: '/api/test',
        }),
      },
    ];

    hoisted.getMock.mockResolvedValueOnce({
      forEach: (cb: (doc: (typeof fakeDocs)[number]) => void) =>
        fakeDocs.forEach(cb),
    });

    const result = await getRequestHistoryServer('user1');

    expect(hoisted.collectionMock).toHaveBeenCalledWith('requestHistory');
    expect(result.requests).toHaveLength(1);
    expect(result.requests[0].id).toBe('1');
    expect(result.totalCount).toBe(1);
  });
});
