export interface SignInDataInterface {
  ipAddress: string;
  userAgent: string;
  accessToken: string;
  expires: boolean;
}

export interface SignUpJoinInterface {
  platform: number;
  accessToken: string;
}

export interface SignUpDataInterface {
  ipAddress: string;
  userAgent: string;
  platform: number;
  accessToken: string;
  expires: boolean;
  join?: SignUpJoinInterface;
}

export interface DeezerCredentialsInterface {
  token: string;
  expires: boolean;
  expires_in?: string | null;
  refresh_token?: string;
}
