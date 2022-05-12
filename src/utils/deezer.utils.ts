export function validateUri(uri: string): boolean {
  return /^https\:\/\/www\.deezer\.com\/\w{2}\/(track|artist|album|playlist)\/\d+$/g.test(
    uri,
  );
}

export function parseUri(uri: string): any {
  const cleanUri: string = uri.trim();
  if (!validateUri(cleanUri)) {
    throw Error('Invalid Deezer URI');
  }

  const url: URL = new URL(cleanUri);
  const pathChunks: string[] = url.pathname.split('/');

  return {
    domain: url.origin,
    lang: pathChunks[0],
    type: pathChunks[1],
    id: pathChunks[2],
  };
}

export function getIdElementFromUri(uri: string): string {
  const cleanUri: string = uri.trim();
  if (!validateUri(cleanUri)) {
    return '';
  }
  const uriInfo: any = parseUri(cleanUri);
  return uriInfo.id;
}

export function getIdFromUri(uri: string): number {
  const idElement: string = getIdElementFromUri(uri);
  if (idElement === '') {
    return 0;
  }
  return parseInt(idElement);
}
