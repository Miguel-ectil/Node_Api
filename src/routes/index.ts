import { Router } from 'express';
import { uploadImage, postImage } from '../controllers/imagemControll';

const router = Router();

router.post('/uploadImage', uploadImage);
router.post('/postImage', postImage);

export default router;
