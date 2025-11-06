export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  userId: string;
  name: string;
  email: string;
  isAccountVerified: boolean;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface ResendOtpResponse {
  message: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  email: string;
  token: string;
}

export interface AuthCheckResponse {
  authenticated: boolean;
}

export interface LogoutResponse {
  message: string;
}

export interface SendResetOtpRequest {
  email: string;
}

export interface SendResetOtpResponse {
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  isAccountVerified: boolean;
}
