export interface IAuthState {
  accessToken?: string;
  refreshToken?: string;
  isAuthenticated?: boolean;
  error?: Error;
}