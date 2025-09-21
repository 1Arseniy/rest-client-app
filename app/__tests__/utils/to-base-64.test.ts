import { it, expect, describe } from 'vitest';
import { returnToString, toBase64 } from '@/utils/to-base-64';

import '@testing-library/jest-dom/vitest';

describe('tests toBase64', () => {
  it('should right encode url', () => {
    const encode = toBase64('https://jsonplaceholder.typicode.com/todos/');

    expect(encode).toBe(
      'aHR0cHMlM0ElMkYlMkZqc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tJTJGdG9kb3MlMkY='
    );
  });
});

describe('tests returnToString', () => {
  it('should right decode url', () => {
    const decode = returnToString(
      'aHR0cHMlM0ElMkYlMkZqc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tJTJGdG9kb3MlMkY='
    );

    expect(decode).toBe('https://jsonplaceholder.typicode.com/todos/');
  });
});
