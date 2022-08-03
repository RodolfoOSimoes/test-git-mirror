export enum PlatformEnum {
  SPOTIFY = 1,
  DEEZER = 2,
  YOUTUBE = 3,
}

export function resolvePlatformId(platform: string) {
  switch (platform) {
    case 'spotify':
      return PlatformEnum.SPOTIFY;
    case 'deezer':
      return PlatformEnum.DEEZER;
    case 'youtube':
      return PlatformEnum.YOUTUBE;
    default:
      throw new Error('Invalid platform');
  }
}
