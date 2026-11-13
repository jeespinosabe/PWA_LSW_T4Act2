import Instituto, { COLECCIONES, CAMPOS_NEGOCIO } from '../models/Instituto.js';
import boom from '@hapi/boom';

// Deja solo los campos permitidos del cuerpo de la petición
const elegir = (cuerpo = {}, campos) =>
    Object.fromEntries(campos.filter((c) => cuerpo[c] !== undefined).map((c) => [c, cuerpo[c]]));

const camposDe = (coleccion) => {
    if (!COLECCIONES[coleccion]) throw boom.badRequest(`Lista no válida: ${coleccion}`);
    return Object.keys(COLECCIONES[coleccion]);
};

const buscarInstituto = async (idInstituto) => {
    const instituto = await Instituto.findOne({ IdInstitutoOK: idInstituto });
    if (!instituto) throw boom.notFound('No se encontró el instituto.');
    return instituto;
};

const buscarNegocio = (instituto, idNegocio) => {
    const negocio = instituto.cat_negocios.id(idNegocio);
    if (!negocio) throw boom.notFound('No se encontró el negocio.');
    return negocio;
};

const buscarItem = (negocio, coleccion, idItem) => {
    const item = negocio[coleccion].id(idItem);
    if (!item) throw boom.notFound('No se encontró el registro.');
    return item;
};

const validarClaveNegocio = (instituto, clave, idActual = null) => {
    const repetido = instituto.cat_negocios.some(
        (n) => n.IdNegocioOK === clave && String(n._id) !== String(idActual)
    );
    if (repetido) throw boom.conflict('Ya existe un negocio con ese IdNegocioOK en este instituto.');
};

// ----- Negocios -----
export const getNegocios = async (idInstituto) => {
    const instituto = await buscarInstituto(idInstituto);
    return instituto.cat_negocios;
};

export const postNegocio = async (idInstituto, cuerpo) => {
    const instituto = await buscarInstituto(idInstituto);
    const datos = elegir(cuerpo, CAMPOS_NEGOCIO);
    validarClaveNegocio(instituto, datos.IdNegocioOK);
    instituto.cat_negocios.push(datos);
    await instituto.save();
    return instituto.cat_negocios[instituto.cat_negocios.length - 1];
};

export const putNegocio = async (idInstituto, idNegocio, cuerpo) => {
    const instituto = await buscarInstituto(idInstituto);
    const negocio = buscarNegocio(instituto, idNegocio);
    const datos = elegir(cuerpo, CAMPOS_NEGOCIO);
    if (datos.IdNegocioOK !== undefined) validarClaveNegocio(instituto, datos.IdNegocioOK, negocio._id);
    negocio.set(datos);
    await instituto.save();
    return negocio;
};

export const deleteNegocio = async (idInstituto, idNegocio) => {
    const instituto = await buscarInstituto(idInstituto);
    const negocio = buscarNegocio(instituto, idNegocio);
    instituto.cat_negocios.pull(negocio._id);
    await instituto.save();
    return negocio;
};

// ----- Listas de un negocio (info_ad, archivos, telefonos, dir_webs, domicilios) -----
export const getItems = async (idInstituto, idNegocio, coleccion) => {
    camposDe(coleccion);
    const instituto = await buscarInstituto(idInstituto);
    return buscarNegocio(instituto, idNegocio)[coleccion];
};

export const postItem = async (idInstituto, idNegocio, coleccion, cuerpo) => {
    const campos = camposDe(coleccion);
    const instituto = await buscarInstituto(idInstituto);
    const negocio = buscarNegocio(instituto, idNegocio);
    negocio[coleccion].push(elegir(cuerpo, campos));
    await instituto.save();
    return negocio[coleccion][negocio[coleccion].length - 1];
};

export const putItem = async (idInstituto, idNegocio, coleccion, idItem, cuerpo) => {
    const campos = camposDe(coleccion);
    const instituto = await buscarInstituto(idInstituto);
    const item = buscarItem(buscarNegocio(instituto, idNegocio), coleccion, idItem);
    item.set(elegir(cuerpo, campos));
    await instituto.save();
    return item;
};

export const deleteItem = async (idInstituto, idNegocio, coleccion, idItem) => {
    camposDe(coleccion);
    const instituto = await buscarInstituto(idInstituto);
    const negocio = buscarNegocio(instituto, idNegocio);
    const item = buscarItem(negocio, coleccion, idItem);
    negocio[coleccion].pull(item._id);
    await instituto.save();
    return item;
};
