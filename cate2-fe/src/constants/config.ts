export const config = {
  baseApiURL: process.env.VITE_BASE_API_URL as string,
  authClientId: process.env.VITE_AUTH_CLIENT_ID as string,
  authRedirectUrl: process.env.VITE_AUTH_REDIRECT_URL as string,
  authAuthority: process.env.VITE_AUTH_AUTHORITY as string,
};
