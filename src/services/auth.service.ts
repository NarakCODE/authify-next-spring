import { apiClient } from "@/lib/api-client";
import {
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  SignInRequest,
  SignInResponse,
  AuthCheckResponse,
  LogoutResponse,
} from "@/types/auth";

export const authService = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return apiClient<RegisterResponse>("/api/v1.0/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    return apiClient<VerifyOtpResponse>("/api/v1.0/verify-account", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  resendOtp: async (data: ResendOtpRequest): Promise<ResendOtpResponse> => {
    return apiClient<ResendOtpResponse>("/api/v1.0/resend-otp", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  signIn: async (data: SignInRequest): Promise<SignInResponse> => {
    return apiClient<SignInResponse>("/api/v1.0/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  checkAuth: async (): Promise<AuthCheckResponse> => {
    const result = await apiClient<boolean>("/api/v1.0/is-authenticated", {
      method: "GET",
    });
    // Handle both boolean and object responses
    if (typeof result === "boolean") {
      return { authenticated: result };
    }
    return result as AuthCheckResponse;
  },

  logout: async (): Promise<LogoutResponse> => {
    return apiClient<LogoutResponse>("/api/v1.0/logout", {
      method: "POST",
    });
  },
};
