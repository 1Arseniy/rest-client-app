import type { TypeResponse } from '@/types/types';

export async function getData(
  method: string,
  url: string
): Promise<TypeResponse> {
  try {
    const response = await fetch(url, {
      method,
    });
    if (!response.ok) {
      return {
        status: `${response.status} ${response.statusText}`,
        error: await response.text(),
      };
    }
    const data = JSON.stringify(await response.json(), null, 8);
    return { status: `${response.status} ${response.statusText}`, data };
  } catch (err) {
    if (err instanceof Error) {
      return { status: '', error: err.message };
    }
  }
  return { status: '' };
}
