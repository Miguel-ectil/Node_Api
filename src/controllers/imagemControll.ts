import { Request, Response } from 'express';
import { salvarImage, sendToLLM } from '../services/imageService';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).send('Imagem Base64 não fornecida');
    }

    const filePath = await salvarImage(imageBase64);
    res.status(200).json({ message: 'Imagem recebida e salva com sucesso', filePath });
  } catch (error) {
    console.error('Erro ao salvar a imagem:', error);
    res.status(500).send('Erro ao processar a imagem.');
  }
}

export const postImage = async (req: Request, res: Response) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).send('Imagem Base64 não fornecida');
    }

    const filePath = await salvarImage(imageBase64);
    const value = await sendToLLM(filePath);
    res.status(200).json({ message: 'Imagem processada com sucesso', value });
  } catch (error) {
    console.error('Erro ao processar a imagem:', error);
    res.status(500).send('Erro ao processar a imagem.');
  }
}
