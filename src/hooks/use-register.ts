import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { RegisterRequest, RegisterResponse } from "@/types/auth";
import { ApiError } from "@/lib/api-client";

export function useRegister() {
  return useMutation<RegisterResponse, ApiError, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
}
