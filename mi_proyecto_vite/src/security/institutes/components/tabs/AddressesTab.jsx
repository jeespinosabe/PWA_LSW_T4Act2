import SubItemsTab from "./SubItemsTab";

const fields = [
  { name: "Calle", label: "Calle", required: true },
  { name: "NumExt", label: "Núm. exterior", size: 100 },
  { name: "NumInt", label: "Núm. interior", size: 100 },
  { name: "Colonia", label: "Colonia" },
  { name: "CP", label: "C.P.", size: 80 },
  { name: "Ciudad", label: "Ciudad" },
  { name: "Estado", label: "Estado" },
  { name: "Pais", label: "País" },
];

export default function AddressesTab({ institute, business }) {
  return (
    <SubItemsTab
      institute={institute}
      business={business}
      collection="domicilios"
      title="Domicilios"
      itemLabel="domicilio"
      fields={fields}
    />
  );
}
