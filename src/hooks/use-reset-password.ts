import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { ResetPasswordRequest, ResetPasswordResponse } from "@/types/auth";
import { ApiError } from "@/lib/api-client";

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, ApiError, ResetPasswordRequest>({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
  });
}
