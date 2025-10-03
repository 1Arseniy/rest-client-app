import { returnToString } from '@/utils/to-base-64';

function getHeaders(searchParams: URLSearchParams) {
  const headers = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'language' && key !== 'userId')
    .map(([key, value]) => ({
      key,
      value: returnToString(value),
    }));

  return headers;
}

export default getHeaders;
