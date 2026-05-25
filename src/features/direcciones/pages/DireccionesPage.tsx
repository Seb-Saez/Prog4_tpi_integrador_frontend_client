import { useState } from "react";
import { useDirecciones } from "../hooks/useDirecciones";
import { useCrearDireccion } from "../hooks/useCrearDireccion";
import { useActualizarDireccion } from "../hooks/useActualizarDireccion";
import { useEliminarDireccion } from "../hooks/useEliminarDireccion";
import type { DireccionCreate, DireccionUpdate } from "../types/direccion";

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all";

const DireccionesPage = () => {
  const direccionesQuery = useDirecciones();
  const crear = useCrearDireccion();
  const actualizar = useActualizarDireccion();
  const eliminar = useEliminarDireccion();

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<DireccionCreate>({
    alias: "",
    linea1: "",
    linea2: "",
    ciudad: "",
    provincia: "",
    codigo_postal: "",
    latitud: null,
    longitud: null,
    es_principal: false,
  });

  const resetForm = () => {
    setForm({
      alias: "",
      linea1: "",
      linea2: "",
      ciudad: "",
      provincia: "",
      codigo_postal: "",
      latitud: null,
      longitud: null,
      es_principal: false,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updateData: DireccionUpdate = {};
        if (form.alias) updateData.alias = form.alias;
        if (form.linea1) updateData.linea1 = form.linea1;
        if (form.linea2 !== undefined) updateData.linea2 = form.linea2;
        if (form.ciudad) updateData.ciudad = form.ciudad;
        if (form.provincia) updateData.provincia = form.provincia;
        if (form.codigo_postal) updateData.codigo_postal = form.codigo_postal;
        updateData.es_principal = form.es_principal;
        await actualizar.mutateAsync({ id: editingId, data: updateData });
      } else {
        await crear.mutateAsync(form);
      }
      setFormOpen(false);
      resetForm();
    } catch {
      // error handling via toast or alert could be added
    }
  };

  const handleEdit = (d: {
    id: number;
    alias: string;
    linea1: string;
    linea2?: string | null;
    ciudad: string;
    provincia: string;
    codigo_postal: string;
    latitud?: number | null;
    longitud?: number | null;
    es_principal: boolean;
  }) => {
    setForm({
      alias: d.alias,
      linea1: d.linea1,
      linea2: d.linea2 || "",
      ciudad: d.ciudad,
      provincia: d.provincia,
      codigo_postal: d.codigo_postal,
      latitud: d.latitud ?? null,
      longitud: d.longitud ?? null,
      es_principal: d.es_principal,
    });
    setEditingId(d.id);
    setFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta dirección?")) return;
    await eliminar.mutateAsync(id);
  };

  if (direccionesQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (direccionesQuery.isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">Error al cargar las direcciones.</p>
      </div>
    );
  }

  const direcciones = Array.isArray(direccionesQuery.data)
    ? direccionesQuery.data
    : [];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-900">
          Mis Direcciones
        </h1>
        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
          }}
          className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition hover:brightness-105 active:scale-[0.99]"
        >
          + Nueva
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-stone-800 mb-4">
            {editingId ? "Editar dirección" : "Nueva dirección"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Alias *
              </label>
              <input
                required
                maxLength={50}
                value={form.alias}
                onChange={(e) => setForm({ ...form, alias: e.target.value })}
                placeholder="Ej: Casa, Trabajo"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Calle y número *
              </label>
              <input
                required
                value={form.linea1}
                onChange={(e) => setForm({ ...form, linea1: e.target.value })}
                placeholder="Ej: Av. Siempre Viva 742"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Departamento / Piso
              </label>
              <input
                value={form.linea2 || ""}
                onChange={(e) =>
                  setForm({ ...form, linea2: e.target.value || null })
                }
                placeholder="Ej: Depto 3B"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Ciudad *
              </label>
              <input
                required
                maxLength={100}
                value={form.ciudad}
                onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
                placeholder="Ej: Springfield"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Provincia *
              </label>
              <input
                required
                maxLength={100}
                value={form.provincia}
                onChange={(e) =>
                  setForm({ ...form, provincia: e.target.value })
                }
                placeholder="Ej: Buenos Aires"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Código postal *
              </label>
              <input
                required
                maxLength={10}
                value={form.codigo_postal}
                onChange={(e) =>
                  setForm({ ...form, codigo_postal: e.target.value })
                }
                placeholder="Ej: 1234"
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="es_principal"
              checked={form.es_principal}
              onChange={(e) =>
                setForm({ ...form, es_principal: e.target.checked })
              }
              className="h-4 w-4 rounded border-stone-300 text-orange-500 focus:ring-orange-500/30"
            />
            <label
              htmlFor="es_principal"
              className="text-sm text-stone-700 select-none"
            >
              Dirección principal
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={crear.isPending || actualizar.isPending}
              className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-50"
            >
              {editingId ? "Guardar cambios" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormOpen(false);
                resetForm();
              }}
              className="rounded-xl border border-stone-200 bg-white px-6 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {direcciones.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-100">
          <p className="text-stone-500 text-lg">
            No tenés direcciones guardadas.
          </p>
          <p className="text-stone-400 text-sm mt-2">
            Agregá una para usar en tus pedidos con delivery.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {direcciones.map((d) => (
            <div
              key={d.id}
              className="flex items-start justify-between rounded-xl border border-stone-100 bg-white p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-stone-900">{d.alias}</h3>
                  {d.es_principal && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-600 border border-orange-100 uppercase tracking-wide">
                      Principal
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-600">
                  {d.linea1}
                  {d.linea2 ? `, ${d.linea2}` : ""}
                </p>
                <p className="text-sm text-stone-400">
                  {d.ciudad}, {d.provincia} — {d.codigo_postal}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-3">
                <button
                  onClick={() => handleEdit(d)}
                  className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                  title="Editar"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="rounded-lg p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
                  title="Eliminar"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DireccionesPage;
