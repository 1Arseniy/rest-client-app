import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loader } from './index';
import * as firebaseAdmin from '@/services/firebase-admin';

describe('History loader', () => {
  const mockGetHistory = vi.spyOn(firebaseAdmin, 'getRequestHistoryServer');

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return error, if userId is empty', async () => {
    const request = new Request('http://localhost/history');
    const args = {
      request,
      params: {},
      context: {},
    };

    const result = await loader(args);

    expect(result).toEqual({
      requests: [],
      totalCount: 0,
      error: 'User not authenticated',
    });
  });

  it('should return history data, if userId is correct', async () => {
    const fakeData = {
      requests: [
        {
          id: '1',
          userId: '123',
          method: 'GET',
          url: '/test',
          headers: [],
          body: '',
          typeTextarea: 'json',
          responseStatusCode: 200,
          requestDuration: 100,
          requestTimestamp: Date.now(),
          endpoint: '/test',
          errorDetails: '',
          requestSize: 0,
          responseSize: 0,
        },
      ],
      totalCount: 1,
    } satisfies Awaited<
      ReturnType<typeof firebaseAdmin.getRequestHistoryServer>
    >;

    mockGetHistory.mockResolvedValueOnce(fakeData);

    const request = new Request('http://localhost/history?userId=123');
    const args = {
      request,
      params: {},
      context: {},
    };

    const result = await loader(args);

    expect(result).toEqual(fakeData);
    expect(mockGetHistory).toHaveBeenCalledWith('123');
  });

  it('should return error, if getRequestHistoryServer throw error', async () => {
    mockGetHistory.mockRejectedValueOnce(new Error('DB error'));

    const request = new Request('http://localhost/history?userId=123');
    const args = {
      request,
      params: {},
      context: {},
    };

    const result = await loader(args);

    expect(result).toEqual({
      requests: [],
      totalCount: 0,
      error: 'Failed to load history',
    });
  });
});
