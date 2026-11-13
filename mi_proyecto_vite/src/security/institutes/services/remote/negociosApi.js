import axios from "axios";

const baseInstitutos = () => `${import.meta.env.VITE_REST_API_SECURITY_EDUCATION}/institutos`;

// Operaciones de una lista: la API responde { success, data }
const crud = (url) => ({
  list:   async ()         => (await axios.get(url)).data.data,
  create: async (datos)    => (await axios.post(url, datos)).data.data,
  update: async (id, datos) => (await axios.put(`${url}/${id}`, datos)).data.data,
  remove: async (id)       => (await axios.delete(`${url}/${id}`)).data.data,
});

// Negocios de un instituto
export const negociosApi = (idInstituto) =>
  crud(`${baseInstitutos()}/${encodeURIComponent(idInstituto)}/negocios`);

// Listas de un negocio: info_ad | archivos | telefonos | dir_webs | domicilios
export const itemsApi = (idInstituto, idNegocio, coleccion) =>
  crud(`${baseInstitutos()}/${encodeURIComponent(idInstituto)}/negocios/${idNegocio}/${coleccion}`);

// Mensaje legible de un error de la API
export const textoError = (error) =>
  error?.response?.data?.message || error?.message || "Ocurrió un error";
