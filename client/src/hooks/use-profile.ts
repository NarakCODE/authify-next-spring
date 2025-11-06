import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { authStorage } from "@/lib/auth";

export function useProfile() {
  const hasToken = authStorage.isAuthenticated();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: authService.getProfile,
    enabled: hasToken, // Only run if token exists
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    profile: data,
    isLoading,
    error,
    refetch,
  };
}
