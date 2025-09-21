export function toBase64(request: string) {
  return btoa(encodeURIComponent(request));
}

export function returnToString(decodeStr: string) {
  try {
    return JSON.parse(decodeURIComponent(atob(decodeStr)));
  } catch {
    return decodeURIComponent(atob(decodeStr));
  }
}
