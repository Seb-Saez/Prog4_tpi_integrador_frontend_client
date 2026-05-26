import { Guard } from "@/components/guard/Guard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/router/routes";

export function GuestOnly() {
  const { user, isLoading } = useAuth();

  return (
    <Guard
      isAllowed={!user}
      isLoading={isLoading}
      redirectTo={ROUTES.INICIO}
    />
  );
}