export function validatePlaylistUri(uri: string): boolean {
  return /^https\:\/\/www\.deezer\.com\/\w{2}\/playlist\/\d+$/g.test(uri);
}

export function getPlaylistIdElementFromUri(uri: string): string {
  const cleanUri: string = uri.trim();
  if (!validatePlaylistUri(cleanUri)) {
    return "";
  }
  return /\d+$/g.exec(cleanUri)[0];
}

export function getPlaylistFromUri(uri: string): number {
  const idElement: string = getPlaylistIdElementFromUri(uri);
  if (idElement === '') {
    return 0;
  }
  return parseInt(idElement);
}
