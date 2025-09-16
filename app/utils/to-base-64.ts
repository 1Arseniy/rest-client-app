export function toBase64(request: string) {
  return btoa(encodeURIComponent(request));
}

export function returnToString(decodeStr: string) {
  return decodeURIComponent(atob(decodeStr));
}
