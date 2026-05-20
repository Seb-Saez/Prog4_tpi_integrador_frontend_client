import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const inputClass =
  "w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await login(value);
      navigate("/");
    },
  });

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-xl shadow-stone-400/20">
      {/* Cabecera con marca */}
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 px-8 py-8 text-center">
        <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30">
          <svg
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
        </span>
        <h1 className="font-display text-2xl font-semibold text-white">
          Iniciar sesión
        </h1>
        <p className="mt-1 text-sm text-orange-50">
          Ingresá a tu cuenta de FoodStore
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5 p-8"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Email
          </label>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value?.trim()
                  ? { message: "El email es obligatorio" }
                  : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? { message: "Email inválido" }
                  : undefined,
            }}
            children={(field) => (
              <>
                <input
                  type="email"
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={inputClass}
                  placeholder="tu@email.com"
                />
                {field.state.meta.errors && (
                  <p className="mt-1 text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Contraseña
          </label>
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value ? { message: "La contraseña es obligatoria" } : undefined,
            }}
            children={(field) => (
              <>
                <input
                  type="password"
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={inputClass}
                  placeholder="Tu contraseña"
                />
                {field.state.meta.errors && (
                  <p className="mt-1 text-xs text-red-500">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:shadow-none"
            >
              {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
            </button>
          )}
        />

        <p className="text-center text-sm text-stone-500">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
