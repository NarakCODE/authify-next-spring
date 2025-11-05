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
};
