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
  SendResetOtpRequest,
  SendResetOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UserProfile,
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
    return apiClient<ResendOtpResponse>("/api/v1.0/resend-verification-otp", {
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

  sendResetOtp: async (
    data: SendResetOtpRequest
  ): Promise<SendResetOtpResponse> => {
    return apiClient<SendResetOtpResponse>(
      `/api/v1.0/send-reset-otp?email=${encodeURIComponent(data.email)}`,
      {
        method: "POST",
      }
    );
  },

  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    return apiClient<ResetPasswordResponse>("/api/v1.0/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getProfile: async (): Promise<UserProfile> => {
    return apiClient<UserProfile>("/api/v1.0/profile", {
      method: "GET",
    });
  },
};
