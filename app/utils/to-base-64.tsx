export function toBase64(request: string) {
  return btoa(request);
}

export function returnToString(decodeStr: string) {
  return atob(decodeStr);
}
