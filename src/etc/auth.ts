export interface SignInDataInterface {
  ipAddress: string;
  userAgent: string;
  accessToken: string;
  expires: boolean;
}

export interface SignUpDataInterface {
  ipAddress: string;
  userAgent: string;
  accessToken: string;
  expires: boolean;
  join?: any;
}

export interface DeezerCredentialsInterface {
  token: string;
  expires: boolean;
  expires_in?: string | null;
  refresh_token?: string;
}
