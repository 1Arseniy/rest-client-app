import type { TypeResponse, TypeHeader } from '@/types/types';

export async function getData(
  method: string,
  url: string,
  headers: TypeHeader[],
  body: string,
  typeTextarea: string
): Promise<TypeResponse> {
  try {
    const content =
      typeTextarea === 'JSON' ? JSON.stringify(JSON.parse(body)) : body;
    const response = await fetch(url, {
      method,
      headers: headers.reduce((acc: { [key: string]: string }, header) => {
        acc[header.key] = header.value;
        return acc;
      }, {}),
      body: body ? content : null,
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
