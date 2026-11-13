import SubItemsTab from "./SubItemsTab";

const fields = [
  { name: "Etiqueta", label: "Etiqueta", required: true },
  { name: "Valor", label: "Valor", required: true },
  { name: "Seccion", label: "Sección" },
];

export default function InfoAdTab({ institute, business }) {
  return (
    <SubItemsTab
      institute={institute}
      business={business}
      collection="info_ad"
      title="Información adicional"
      itemLabel="dato adicional"
      fields={fields}
    />
  );
}
