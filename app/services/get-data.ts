// 'use server';

export async function getData(method: string, url: string) {
  try {
    const response = await fetch(url, {
      method,
    });
    if (!response.ok) {
      //   console.log('status', response.status);
      const text = await response.text();
      throw new Error(`Error ${response.status}: ${text}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return err;
    }
  }
}
