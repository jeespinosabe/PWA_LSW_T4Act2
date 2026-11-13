import { useMemo } from "react";
import { Alert, Box } from "@mui/material";
import CrudTable from "../tables/CrudTable";
import { itemsApi } from "../../services/remote/negociosApi";
import useRemoteList from "../../helpers/useRemoteList";

// Pestaña genérica para una lista del negocio seleccionado
// (info_ad, archivos, telefonos, dir_webs o domicilios)
export default function SubItemsTab({ institute, business, collection, title, itemLabel, fields }) {
  const api = useMemo(
    () => (institute && business ? itemsApi(institute.IdInstitutoOK, business._id, collection) : null),
    [institute, business, collection]
  );
  const { rows, loading, error, reload } = useRemoteList(api);

  if (!api) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        Selecciona un negocio en la pestaña «Negocios» para ver su información.
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 2, mx: 1 }}>
      <CrudTable
        title={title}
        subtitle={`Negocio: ${business.DesNegocio}`}
        itemLabel={itemLabel}
        fields={fields}
        rows={rows}
        loading={loading}
        error={error}
        onCreate={async (datos) => { await api.create(datos); reload(); }}
        onUpdate={async (fila, datos) => { await api.update(fila._id, datos); reload(); }}
        onDelete={async (fila) => { await api.remove(fila._id); reload(); }}
      />
    </Box>
  );
}
