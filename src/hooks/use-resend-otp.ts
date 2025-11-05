import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { ResendOtpRequest, ResendOtpResponse } from "@/types/auth";
import { ApiError } from "@/lib/api-client";

export function useResendOtp() {
  return useMutation<ResendOtpResponse, ApiError, ResendOtpRequest>({
    mutationFn: (data: ResendOtpRequest) => authService.resendOtp(data),
  });
}
