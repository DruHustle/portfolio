export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

// Simple login function - no external OAuth needed
export const getLoginUrl = () => {
  return "/login";
};
