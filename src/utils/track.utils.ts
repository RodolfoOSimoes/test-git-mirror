export function validateTrackUri(uri: string): boolean {
  return /^https\:\/\/www\.deezer\.com\/\w{2}\/track\/\d+$/g.test(uri);
}

export function getTrackIdElementFromUri(uri: string): string {
  const cleanUri: string = uri.trim();
  if (!validateTrackUri(cleanUri)) {
    return "";
  }
  return /\d+$/g.exec(cleanUri)[0];
}

export function getTrackIdFromUri(uri: string): number {
  const idElement: string = getTrackIdElementFromUri(uri);
  if (idElement === '') {
    return 0;
  }
  return parseInt(idElement);
}
