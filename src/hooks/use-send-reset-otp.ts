import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { SendResetOtpRequest, SendResetOtpResponse } from "@/types/auth";
import { ApiError } from "@/lib/api-client";

export function useSendResetOtp() {
  return useMutation<SendResetOtpResponse, ApiError, SendResetOtpRequest>({
    mutationFn: (data: SendResetOtpRequest) => authService.sendResetOtp(data),
  });
}
