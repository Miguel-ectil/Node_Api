import { Request, Response } from 'express';
import { salvarImage } from '../services/imageService';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).send('Imagem Base64 não fornecida');
    }

    const filePath = await salvarImage(imageBase64);
    res.status(200).send(`Imagem recebida e salva com sucesso `); //em ${filePath}
  } catch (error) {
    console.error('Erro ao salvar a imagem:', error);
    res.status(500).send('Erro ao processar a imagem.');
  }
};