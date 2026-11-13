import { useEffect, useRef, useState } from 'react';
import reqRespApi from '../api/reqRes.jsx';

// Hook personalizado para manejar la lógica de paginación de usuarios
export const useUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const ficRefPage = useRef(1);

    useEffect(() => {
        //FIC: llamar función de carga de usuarios.
        ficFnCargaUsuarios();
    }, []);

    const ficFnCargaUsuarios = async () => {
        await reqRespApi.get('/users', {
            //FIC: llamado de la API
            params: {
                page: ficRefPage.current
            }
        })
        .then(resp => {
            if (resp.data.data.length > 0) {
                setUsuarios(resp.data.data);
            } else {
                // Si no hay registros se regresa a la última página válida
                ficRefPage.current--;
                alert('No hay más registros');
            }
        })
        .catch(err => console.log(err));
    };

    const ficFnPaginaSiguiente = () => {
        ficRefPage.current++;
        ficFnCargaUsuarios();
    };

    const ficFnPaginaAnterior = () => {
        if (ficRefPage.current > 1) {
            ficRefPage.current--;
            ficFnCargaUsuarios();
        }
    };

    return {
        usuarios,
        ficFnPaginaSiguiente,
        ficFnPaginaAnterior,
        ficRefPage
    };
};
