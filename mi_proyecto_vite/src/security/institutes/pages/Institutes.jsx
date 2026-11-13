import { Box } from "@mui/material";
import { useState } from "react";
import InstitutesNavTab from "../components/tabs/InstitutesNavTab";
import InstitutesTab from "../components/tabs/InstitutesTab";
import BusinessTab from '../components/tabs/BusinessTab';
// 1. IMPORTA LA MODAL AQUÍ
import AddInstituteModal from "../components/modals/AddInstituteModal";

const Institutes = () => {
    const [currentRowInInstitutesTab, setCurrentRowInInstitutesTab] = useState(0);
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("INSTITUTOS");

    // Instituto elegido en la tabla; sus negocios se ven en la pestaña "Negocios"
    const [selectedInstitute, setSelectedInstitute] = useState(null);

    // 2. CREA EL ESTADO PARA LA MODAL
    const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);

    return (
        <Box>
            <InstitutesNavTab
                currentRowInInstitutesTab={currentRowInInstitutesTab}
                setCurrentNameTabInPrincipalTab={setCurrentTabInPrincipalTab}
            />

            {/* 3. PÁSALE EL ESTADO A INSTITUTESTAB */}
            {currentTabInPrincipalTab == "INSTITUTOS" && (
                <InstitutesTab
                    selectedId={selectedInstitute?.IdInstitutoOK}
                    onSelect={setSelectedInstitute}
                />
            )}

            {currentTabInPrincipalTab == "NEGOCIOS" && <BusinessTab institute={selectedInstitute} />}

            {/* 4. COLOCA LA MODAL AL FINAL */}
            <AddInstituteModal 
                AddInstituteShowModal={AddInstituteShowModal}
                setAddInstituteShowModal={setAddInstituteShowModal}
            />
        </Box>
    );
};

export default Institutes;