import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";

// Animación de entrada escalonada, reutilizada en los bloques de la landing.
const fadeUp = "animate-[fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both]";

const perks = [
  {
    label: "Retiro en el local",
    desc: "Pasá a buscarlo cuando esté listo",
    path: "M3 7l1.5 12a2 2 0 002 1.8h11a2 2 0 002-1.8L21 7M3 7h18M3 7l2-4h14l2 4M9 11v4m6-4v4",
  },
  {
    label: "Delivery a domicilio",
    desc: "Te lo llevamos a tu puerta",
    path: "M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H3m10 11h-4M3 8h4m9 0h2.5a1 1 0 01.9.5l2.1 3.5V16h-3",
  },
  {
    label: "Pagá con MercadoPago",
    desc: "O efectivo y transferencia",
    path: "M3 10h18M7 15h2m-4 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

export default function HomePage() {
  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Atmósfera: orbes cálidos difuminados */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-amber-300/50 to-orange-400/40 blur-3xl animate-[float-slow_8s_ease-in-out_infinite]" />
        <div className="absolute -left-24 top-44 h-80 w-80 rounded-full bg-gradient-to-br from-orange-200/45 to-rose-300/30 blur-3xl animate-[float-slow_11s_ease-in-out_infinite]" />
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="grid items-center gap-10 py-8 md:grid-cols-2 md:py-16">
        <div>
          <span
            className={`${fadeUp} inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700`}
            style={{ animationDelay: "60ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Comé rico, pedí fácil
          </span>

          <h1
            className={`${fadeUp} mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-stone-900 sm:text-6xl`}
            style={{ animationDelay: "140ms" }}
          >
            Sabor que llega
            <br />
            <span className="bg-gradient-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent">
              a tu puerta.
            </span>
          </h1>

          <p
            className={`${fadeUp} mt-5 max-w-md text-lg leading-relaxed text-stone-600`}
            style={{ animationDelay: "220ms" }}
          >
            Descubrí el menú, armá tu pedido en segundos y elegí retiro en el
            local o delivery. Sin vueltas.
          </p>

          <div
            className={`${fadeUp} mt-8 flex flex-wrap gap-3`}
            style={{ animationDelay: "300ms" }}
          >
            <Link
              to={ROUTES.PRODUCTOS}
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 active:scale-[0.99]"
            >
              Ver productos
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              to={ROUTES.CATEGORIAS}
              className="inline-flex items-center gap-2 rounded-2xl border border-stone-300 bg-white/70 px-6 py-3.5 font-semibold text-stone-700 backdrop-blur transition hover:border-orange-300 hover:text-orange-700"
            >
              Explorar categorías
            </Link>
          </div>
        </div>

        {/* Plato decorativo: anillos concéntricos + monograma */}
        <div
          className={`${fadeUp} relative hidden md:flex md:justify-center`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative grid h-80 w-80 place-items-center animate-[float-slow_9s_ease-in-out_infinite]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/60 to-orange-300/40 blur-2xl" />
            <div className="absolute inset-4 rounded-full border border-orange-200/80 bg-surface/80 shadow-[0_30px_60px_-20px_rgba(234,88,12,0.45)] backdrop-blur-sm" />
            <div className="absolute inset-12 rounded-full border border-dashed border-orange-300/70" />
            <div className="relative grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-inner">
              <span className="font-display text-6xl font-semibold text-white/95">
                F
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARDS HACIA LA TIENDA ────────────────────────────── */}
      <section className="grid gap-5 pb-10 sm:grid-cols-2">
        <Link
          to={ROUTES.PRODUCTOS}
          className={`${fadeUp} group relative overflow-hidden rounded-3xl border border-stone-200/70 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10`}
          style={{ animationDelay: "360ms" }}
        >
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-100">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold text-stone-900">
            Productos
          </h2>
          <p className="mt-1.5 text-stone-500">
            Recorré todo el menú y agregá lo que quieras al carrito.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600">
            Ver la tienda
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>

        <Link
          to={ROUTES.CATEGORIAS}
          className={`${fadeUp} group relative overflow-hidden rounded-3xl border border-stone-200/70 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10`}
          style={{ animationDelay: "440ms" }}
        >
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold text-stone-900">
            Categorías
          </h2>
          <p className="mt-1.5 text-stone-500">
            Encontrá rápido por tipo: hamburguesas, bebidas, postres y más.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600">
            Explorar categorías
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </section>

      {/* ── PERKS ────────────────────────────────────────────── */}
      <section
        className={`${fadeUp} grid gap-4 rounded-3xl border border-stone-200/70 bg-white/60 p-6 backdrop-blur sm:grid-cols-3`}
        style={{ animationDelay: "520ms" }}
      >
        {perks.map((perk) => (
          <div key={perk.label} className="flex items-start gap-3">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={perk.path} />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-stone-800">{perk.label}</p>
              <p className="text-sm text-stone-500">{perk.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
