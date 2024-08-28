import { Router } from 'express';
import { uploadImage } from '../controllers/imagemControll';

const router = Router();

router.post('/getImagem', uploadImage);

export default router;