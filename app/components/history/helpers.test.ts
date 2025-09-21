import { it, expect, describe } from 'vitest';

import { formatDuration, getStatusColor, getMethodColor } from './helpers';

describe('tests formatDuration', () => {
  it('should format to ms', () => {
    const time = formatDuration(100);
    expect(time).toBe('100ms');
  });
});

describe('tests getStatusColor', () => {
  it('should return class depending on the status code', () => {
    const success = getStatusColor(200);
    expect(success).toBe('text-green-600');
    const waring = getStatusColor(404);
    expect(waring).toBe('text-yellow-600');
    const error = getStatusColor(500);
    expect(error).toBe('text-red-600');
  });
});

describe('tests getMethodColor', () => {
  it('should return class depending on the method', () => {
    const get = getMethodColor('get');
    expect(get).toBe('bg-green-100 text-green-800');
    const post = getMethodColor('post');
    expect(post).toBe('bg-blue-100 text-blue-800');
  });
});
