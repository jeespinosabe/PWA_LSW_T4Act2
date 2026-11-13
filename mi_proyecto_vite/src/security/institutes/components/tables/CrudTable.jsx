import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, MenuItem, Paper, Stack, TextField, Tooltip, Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { textoError } from "../../services/remote/negociosApi";

// Tabla con alta, edición y baja. Cada campo: { name, label, required, options }
export default function CrudTable({
  title, subtitle, itemLabel, fields, rows, loading, error,
  onCreate, onUpdate, onDelete, onRowClick, selectedId,
}) {
  const [dialog, setDialog] = useState(null);      // null (cerrado) | { row }
  const [values, setValues] = useState({});
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");
  const [saving, setSaving] = useState(false);

  const columns = useMemo(
    () => fields.map((f) => ({ accessorKey: f.name, header: f.label, size: f.size })),
    [fields]
  );

  const openDialog = (row) => {
    setValues(Object.fromEntries(fields.map((f) => [f.name, row?.[f.name] ?? ""])));
    setFormError("");
    setDialog({ row });
  };

  const handleSave = async () => {
    const faltan = fields.filter((f) => f.required && !String(values[f.name] ?? "").trim());
    if (faltan.length) {
      setFormError(`Completa: ${faltan.map((f) => f.label).join(", ")}`);
      return;
    }
    setSaving(true);
    try {
      if (dialog.row) await onUpdate(dialog.row, values);
      else await onCreate(values);
      setDialog(null);
    } catch (e) {
      setFormError(textoError(e));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`¿Eliminar ${itemLabel}?`)) return;
    setActionError("");
    try {
      await onDelete(row);
    } catch (e) {
      setActionError(textoError(e));
    }
  };

  return (
    <Paper elevation={0} sx={{ border: "1px solid #e8edf2", borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ px: 3, py: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack spacing={0.3}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f172a" }}>{title}</Typography>
              <Chip
                label={`${rows.length} ${rows.length === 1 ? "registro" : "registros"}`}
                size="small"
                sx={{ backgroundColor: "#eff6ff", color: "#1a56db", fontWeight: 600, fontSize: "0.7rem", height: "20px", border: "1px solid #bfdbfe" }}
              />
            </Stack>
            {subtitle && <Typography sx={{ fontSize: "0.78rem", color: "#94a3b8" }}>{subtitle}</Typography>}
          </Stack>
          <Tooltip title={`Agregar ${itemLabel}`}>
            <IconButton
              onClick={() => openDialog(null)}
              sx={{ backgroundColor: "#1a56db", color: "#fff", width: 38, height: 38, borderRadius: "10px", "&:hover": { backgroundColor: "#1e40af" } }}
            >
              <AddCircleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {(error || actionError) && (
        <Alert severity="error" sx={{ mx: 3, mb: 1 }} onClose={() => setActionError("")}>
          {error || actionError}
        </Alert>
      )}

      <MaterialReactTable
        columns={columns}
        data={rows}
        getRowId={(row) => row._id}
        state={{ isLoading: loading }}
        enableColumnActions={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableStickyHeader
        enableRowActions
        positionActionsColumn="last"
        displayColumnDefOptions={{ "mrt-row-actions": { header: "Acciones", size: 110 } }}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Tooltip title="Editar">
              <IconButton size="small" onClick={(e) => { e.stopPropagation(); openDialog(row.original); }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); handleDelete(row.original); }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        muiTableBodyRowProps={({ row }) => ({
          onClick: onRowClick ? () => onRowClick(row.original) : undefined,
          selected: row.id === selectedId,
          hover: true,
          sx: { cursor: onRowClick ? "pointer" : "default" },
        })}
        muiTablePaperProps={{ elevation: 0, sx: { borderRadius: 0 } }}
        muiTableContainerProps={{ sx: { maxHeight: "320px" } }}
        renderEmptyRowsFallback={() => (
          <Typography sx={{ p: 3, textAlign: "center", color: "#94a3b8" }}>
            Aún no hay registros. Usa el botón + para agregar.
          </Typography>
        )}
      />

      <Dialog open={Boolean(dialog)} onClose={() => !saving && setDialog(null)} fullWidth maxWidth="sm">
        <DialogTitle>{dialog?.row ? `Editar ${itemLabel}` : `Agregar ${itemLabel}`}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {formError && <Alert severity="error">{formError}</Alert>}
            {fields.map((f) => (
              <TextField
                key={f.name}
                label={f.label}
                required={f.required}
                select={Boolean(f.options)}
                fullWidth
                value={values[f.name] ?? ""}
                onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
              >
                {f.options?.map((op) => (
                  <MenuItem key={op} value={op}>{op}</MenuItem>
                ))}
              </TextField>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialog(null)} color="inherit" disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
