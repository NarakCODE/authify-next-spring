import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { SignInRequest, SignInResponse } from "@/types/auth";
import { ApiError } from "@/lib/api-client";

export function useSignIn() {
  return useMutation<SignInResponse, ApiError, SignInRequest>({
    mutationFn: (data: SignInRequest) => authService.signIn(data),
  });
}
