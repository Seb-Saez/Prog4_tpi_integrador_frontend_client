  // src/features/auth/guards/GuestOnly.tsx
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

/*
La única diferencia que importa: isAllowed={!user} (un solo !). Significa "permitido SOLO si NO hay
user". Y redirige a INICIO en vez de INGRESAR. La lógica es: "esta ruta es para invitados; si ya estás
logueado, andá al home".
*/