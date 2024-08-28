import { Router } from 'express';
import apiController from '../controllers/apiController'

const router = Router();
router.get('/example', apiController.getTeste);

export default router;