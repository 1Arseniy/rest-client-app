import { checkBodyFormat } from '@/utils/check-body-format';
import { renderHook } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { it, expect, describe } from 'vitest';

describe('tests checkBodyFormat', () => {
  const i18n = renderHook(() => useTranslation());
  it('tes', () => {
    const res = checkBodyFormat(
      'JSON',
      `{"name": "John Doe","age": 30,"isStudent": false,"courses": ["Math", "Science"]}`,
      i18n.result.current[0]
    );

    expect(res).toBe(
      JSON.stringify(
        JSON.parse(
          `{"name": "John Doe","age": 30,"isStudent": false,"courses": ["Math","Science"]}`
        ),
        null,
        2
      )
    );
  });
});
