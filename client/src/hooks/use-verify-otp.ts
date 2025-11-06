import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { VerifyOtpRequest, VerifyOtpResponse } from "@/types/auth";
import { ApiError } from "@/lib/api-client";

export function useVerifyOtp() {
  return useMutation<VerifyOtpResponse, ApiError, VerifyOtpRequest>({
    mutationFn: (data: VerifyOtpRequest) => authService.verifyOtp(data),
  });
}
