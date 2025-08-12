import { Router } from 'express';
import { createCliente, getClientes } from '../controllers/ClientesController.js';
export const router=Router()

router.get('/', getClientes)
router.post('/', createCliente)