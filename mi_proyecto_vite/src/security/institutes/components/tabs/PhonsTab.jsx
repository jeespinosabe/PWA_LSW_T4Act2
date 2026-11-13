import SubItemsTab from "./SubItemsTab";

const fields = [
  { name: "Numero", label: "Número", required: true },
  { name: "Tipo", label: "Tipo", options: ["Oficina", "Celular", "WhatsApp", "Fax"], size: 120 },
  { name: "Extension", label: "Extensión", size: 100 },
];

export default function PhonsTab({ institute, business }) {
  return (
    <SubItemsTab
      institute={institute}
      business={business}
      collection="telefonos"
      title="Teléfonos"
      itemLabel="teléfono"
      fields={fields}
    />
  );
}
