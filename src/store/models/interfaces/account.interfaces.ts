export interface IRequestSignIn {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
}