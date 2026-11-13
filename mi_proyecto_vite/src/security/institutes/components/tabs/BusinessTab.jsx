import { Alert, Box, Typography } from "@mui/material";
import { useState } from "react";
import BusinessNavTab from "./BusinessNavTab";
import BusinessesTable from "../tables/BusinessesTable";
import InfoAdTab from "./InfoAdTab";
import FilesTab from "./FilesTab";
import PhonsTab from "./PhonsTab";
import AddressesTab from "./AddressesTab";
import WebAddressesTab from "./WebAddressesTab";

export default function BusinessTab({ institute }) {

    // Negocio seleccionado en la tabla (null mientras no se elija uno)
    const [currentRowInBusinessTab, setCurrentRowInBusinessTab] = useState(null);

    // Controla el nombre del sub-tab actualmente activo. Por default: "NEGOCIOS"
    const [currentNameTabInBusinessTab, setCurrentNameTabInBusinessTab] = useState("NEGOCIOS");

    if (!institute) {
        return (
            <Alert severity="info" sx={{ m: 2 }}>
                Selecciona un instituto en la pestaña «Institutos» para ver sus negocios.
            </Alert>
        );
    }

    return (
        <Box>
            <Typography sx={{ mx: 1, my: 1.5, color: "#475569" }}>
                Instituto: <b>{institute.DesInstituto}</b>
                {currentRowInBusinessTab && <> · Negocio: <b>{currentRowInBusinessTab.DesNegocio}</b></>}
            </Typography>

            {/* Barra de sub-pestañas de Negocios */}
            <BusinessNavTab
                currentRowInBusinessTab={currentRowInBusinessTab}
                setCurrentNameTabInBusinessTab={setCurrentNameTabInBusinessTab}
            />

            {/* Muestra el contenido según el sub-tab seleccionado */}
            {currentNameTabInBusinessTab == "NEGOCIOS" && (
                <BusinessesTable
                    institute={institute}
                    selectedBusiness={currentRowInBusinessTab}
                    onSelect={setCurrentRowInBusinessTab}
                />
            )}
            {currentNameTabInBusinessTab == "INFO ADICIONAL" && <InfoAdTab institute={institute} business={currentRowInBusinessTab} />}
            {currentNameTabInBusinessTab == "ARCHIVOS"       && <FilesTab institute={institute} business={currentRowInBusinessTab} />}
            {currentNameTabInBusinessTab == "TELEFONOS"      && <PhonsTab institute={institute} business={currentRowInBusinessTab} />}
            {currentNameTabInBusinessTab == "DIR WEBS"       && <WebAddressesTab institute={institute} business={currentRowInBusinessTab} />}
            {currentNameTabInBusinessTab == "DOMICILIOS"     && <AddressesTab institute={institute} business={currentRowInBusinessTab} />}
        </Box>
    );
}
