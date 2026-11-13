import * as NegocioServices from '../services/negocio.service.js';

// Responde { success: true, data } y deja que app.js maneje los errores
const responder = (estado, accion) => async (req, res, next) => {
    try {
        res.status(estado).json({ success: true, data: await accion(req.params, req.body) });
    } catch (error) {
        next(error);
    }
};

// Negocios
export const getNegocios   = responder(200, (p) => NegocioServices.getNegocios(p.id));
export const postNegocio   = responder(201, (p, b) => NegocioServices.postNegocio(p.id, b));
export const putNegocio    = responder(200, (p, b) => NegocioServices.putNegocio(p.id, p.negocioId, b));
export const deleteNegocio = responder(200, (p) => NegocioServices.deleteNegocio(p.id, p.negocioId));

// Listas de un negocio
export const getItems   = responder(200, (p) => NegocioServices.getItems(p.id, p.negocioId, p.coleccion));
export const postItem   = responder(201, (p, b) => NegocioServices.postItem(p.id, p.negocioId, p.coleccion, b));
export const putItem    = responder(200, (p, b) => NegocioServices.putItem(p.id, p.negocioId, p.coleccion, p.itemId, b));
export const deleteItem = responder(200, (p) => NegocioServices.deleteItem(p.id, p.negocioId, p.coleccion, p.itemId));
