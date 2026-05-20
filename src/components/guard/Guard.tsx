import { Navigate,Outlet,useLocation } from "react-router-dom";

type GuardProps = {
    isAllowed: boolean;
    isLoading?: boolean;
    redirectTo: string;
}

export const Guard = ({ isAllowed, isLoading, redirectTo }: GuardProps) => {
    const location = useLocation();
    if(isLoading){
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
            </div>
        )
    }
    if (!isAllowed) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
    return <Outlet />;
}

/*
El Guard es una compuerta de tres salidas mutuamente excluyentes, evaluadas en orden
¿isLoading?
    → SÍ  → Spinner (no decide todavía, espera)         [corta acá]
    → NO      ↓
         ¿isAllowed?
           → NO → <Navigate a redirectTo> (lo echa)     [corta acá]
           → SÍ → <Outlet/> (lo deja pasar)
Este componente no decide quién está permitido — solo actúa sobre el booleano que le pasan. Quién calcula
ese booleano (mirando la sesión) es el RequireAuth.
 */