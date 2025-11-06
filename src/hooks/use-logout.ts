import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authStorage } from "@/lib/auth";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { LogoutResponse } from "@/types/auth";
import { ApiError } from "@/lib/api-client";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: logoutMutation, isPending } = useMutation<
    LogoutResponse,
    ApiError,
    void
  >({
    mutationFn: () => authService.logout(),
    onSuccess: (response) => {
      // Clear auth token
      authStorage.logout();

      // Clear all queries
      queryClient.clear();

      // Show toast
      toast.success(response.message || "Logged out successfully");

      // Redirect to sign-in
      router.push("/sign-in");
    },
    onError: (error) => {
      // Even if server logout fails, clear local data
      authStorage.logout();
      queryClient.clear();

      toast.error("Logout error", {
        description: error.message || "An error occurred during logout",
      });

      // Still redirect to sign-in
      router.push("/sign-in");
    },
  });

  const logout = () => {
    logoutMutation();
  };

  return { logout, isPending };
}
