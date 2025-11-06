import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { authStorage } from "@/lib/auth";

export function useAuth() {
  const hasToken = authStorage.isAuthenticated();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["auth", "check"],
    queryFn: authService.checkAuth,
    enabled: hasToken, // Only run if token exists
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isAuthenticated: data?.authenticated ?? false,
    isLoading,
    error,
    refetch,
  };
}
