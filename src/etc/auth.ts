import { PlatformEnum } from 'src/etc/platform';

export interface DeezerProviderCredentials {
  provider: string;
  accessToken: string;
  expires: boolean;
}

export interface GoogleProviderCredentials {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  expires_at: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface SignInData {
  ipAddress: string;
  userAgent: string;
  credentials: DeezerProviderCredentials | GoogleProviderCredentials;
}

export interface SignUpData {
  ipAddress: string;
  userAgent: string;
  credentials: DeezerProviderCredentials | GoogleProviderCredentials;
  join?: DeezerProviderCredentials | GoogleProviderCredentials | null;
}

export interface ApiCredentials {
  accessToken: string;
}

export function resolvePlatform(
  credentials: DeezerProviderCredentials | GoogleProviderCredentials,
): number {
  switch (credentials.provider) {
    case 'spotify':
      return PlatformEnum.SPOTIFY;
    case 'deezer':
      return PlatformEnum.DEEZER;
    case 'google':
      return PlatformEnum.YOUTUBE;
    default:
      throw new Error('Invalid provider');
  }
}
