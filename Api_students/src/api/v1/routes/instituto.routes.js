import { Router } from 'express';
import * as institutoController from '../controllers/instituto.controller.js';
import * as negocioController from '../controllers/negocio.controller.js';

const router = Router();

// BR: GET - Obtener todos los institutos
router.get('/', institutoController.getInstitutoList);

// BR: GET - Obtener un instituto por ID
router.get('/:id', institutoController.getInstitutoItem);

// BR: POST - Crear un nuevo instituto
router.post('/', institutoController.postInstitutoItem);

// BR: PUT - Actualizar un instituto por ID
router.put('/:id', institutoController.putInstitutoItem);

// BR: DELETE - Eliminar un instituto por ID
router.delete('/:id', institutoController.deleteInstitutoItem);

// BR: Negocios de un instituto (se guardan dentro del instituto, en cat_negocios)
router.get('/:id/negocios', negocioController.getNegocios);
router.post('/:id/negocios', negocioController.postNegocio);
router.put('/:id/negocios/:negocioId', negocioController.putNegocio);
router.delete('/:id/negocios/:negocioId', negocioController.deleteNegocio);

// BR: Listas de un negocio. :coleccion = info_ad | archivos | telefonos | dir_webs | domicilios
router.get('/:id/negocios/:negocioId/:coleccion', negocioController.getItems);
router.post('/:id/negocios/:negocioId/:coleccion', negocioController.postItem);
router.put('/:id/negocios/:negocioId/:coleccion/:itemId', negocioController.putItem);
router.delete('/:id/negocios/:negocioId/:coleccion/:itemId', negocioController.deleteItem);

export default router;