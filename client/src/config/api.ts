/**
 * API Configuration
 * Handles environment-based API URL configuration
 */

const getApiUrl = (): string => {
  // Use environment variable if available
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Fallback based on environment
  if (process.env.NODE_ENV === "production") {
    return "https://your-backend-domain.com";
  }

  return "http://localhost:8080";
};

export const API_URL = getApiUrl();
export const API_BASE_PATH = "/api/v1.0";
export const API_FULL_URL = `${API_URL}${API_BASE_PATH}`;

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_FULL_URL}/login`,
  REGISTER: `${API_FULL_URL}/register`,
  LOGOUT: `${API_FULL_URL}/logout`,
  IS_AUTHENTICATED: `${API_FULL_URL}/is-authenticated`,
  SEND_RESET_OTP: `${API_FULL_URL}/send-reset-otp`,
  RESET_PASSWORD: `${API_FULL_URL}/reset-password`,
  RESEND_VERIFICATION_OTP: `${API_FULL_URL}/resend-verification-otp`,
  VERIFY_ACCOUNT: `${API_FULL_URL}/verify-account`,
} as const;
