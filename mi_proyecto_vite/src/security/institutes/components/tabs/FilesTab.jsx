import SubItemsTab from "./SubItemsTab";

const fields = [
  { name: "DesArchivo", label: "Descripción", required: true },
  { name: "RutaArchivo", label: "Ruta o enlace", required: true },
  { name: "TipoArchivo", label: "Tipo", options: ["PDF", "Imagen", "Documento", "Otro"], size: 120 },
];

export default function FilesTab({ institute, business }) {
  return (
    <SubItemsTab
      institute={institute}
      business={business}
      collection="archivos"
      title="Archivos"
      itemLabel="archivo"
      fields={fields}
    />
  );
}
