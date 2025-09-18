import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useVariables from './useVariables';

const mockData = [
  { variable: 'foo', value: 'bar' },
  { variable: 'baz', value: 'qux' },
];

describe('useVariables', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('initializes from localStorage if data exists', () => {
    localStorage.setItem('array', JSON.stringify(mockData));
    const { result } = renderHook(() => useVariables());

    expect(result.current[0]).toEqual(mockData);
  });

  it('initializes with empty array if localStorage is empty', () => {
    const { result } = renderHook(() => useVariables());

    expect(result.current[0]).toEqual([]);
  });

  it('updates localStorage when variables change', () => {
    const setItemSpy = vi.spyOn(localStorage.__proto__, 'setItem');
    const { result } = renderHook(() => useVariables());

    act(() => {
      result.current[1]([{ variable: 'newVar', value: '123' }]);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      'array',
      JSON.stringify([{ variable: 'newVar', value: '123' }])
    );
  });

  it('allows updating variables and reflects new state', () => {
    const { result } = renderHook(() => useVariables());

    act(() => {
      result.current[1](mockData);
    });

    expect(result.current[0]).toEqual(mockData);
  });
});
