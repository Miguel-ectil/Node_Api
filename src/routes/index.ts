import { Router } from 'express';
import { uploadImage } from '../controllers/imagemControll';

const router = Router();

router.post('/upload-image', uploadImage);

export default router;