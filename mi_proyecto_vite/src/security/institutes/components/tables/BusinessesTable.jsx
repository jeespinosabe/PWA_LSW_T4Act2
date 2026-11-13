import { useMemo } from "react";
import { Box } from "@mui/material";
import CrudTable from "./CrudTable";
import { negociosApi } from "../../services/remote/negociosApi";
import useRemoteList from "../../helpers/useRemoteList";

const fields = [
  { name: "IdNegocioOK", label: "ID OK", required: true, size: 100 },
  { name: "IdNegocioBK", label: "ID BK", size: 120 },
  { name: "DesNegocio", label: "Negocio", required: true },
  { name: "Alias", label: "Alias", size: 120 },
];

// Negocios del instituto seleccionado. Al hacer clic en una fila se elige el
// negocio cuya información se ve en las demás pestañas.
export default function BusinessesTable({ institute, selectedBusiness, onSelect }) {
  const api = useMemo(() => negociosApi(institute.IdInstitutoOK), [institute]);
  const { rows, loading, error, reload } = useRemoteList(api);

  return (
    <Box sx={{ mt: 2, mx: 1 }}>
      <CrudTable
        title="Negocios"
        subtitle="Haz clic en un negocio para ver su información adicional, archivos, teléfonos, direcciones web y domicilios"
        itemLabel="negocio"
        fields={fields}
        rows={rows}
        loading={loading}
        error={error}
        selectedId={selectedBusiness?._id}
        onRowClick={onSelect}
        onCreate={async (datos) => {
          const nuevo = await api.create(datos);
          reload();
          onSelect(nuevo);
        }}
        onUpdate={async (fila, datos) => {
          const editado = await api.update(fila._id, datos);
          reload();
          if (selectedBusiness?._id === fila._id) onSelect(editado);
        }}
        onDelete={async (fila) => {
          await api.remove(fila._id);
          reload();
          if (selectedBusiness?._id === fila._id) onSelect(null);
        }}
      />
    </Box>
  );
}
