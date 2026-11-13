import SubItemsTab from "./SubItemsTab";

const fields = [
  { name: "URL", label: "Dirección web", required: true },
  { name: "Descripcion", label: "Descripción" },
  { name: "Tipo", label: "Tipo", options: ["Sitio web", "Facebook", "Instagram", "LinkedIn", "Otro"], size: 130 },
];

export default function WebAddressesTab({ institute, business }) {
  return (
    <SubItemsTab
      institute={institute}
      business={business}
      collection="dir_webs"
      title="Direcciones web"
      itemLabel="dirección web"
      fields={fields}
    />
  );
}
