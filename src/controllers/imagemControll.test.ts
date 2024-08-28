import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import imageRoutes from '../routes/index';
import { salvarImage, sendToLLM } from '../services/imageService';

// Cria uma instância do Express e configura o roteador
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api', imageRoutes);

// Mock das funções
jest.mock('../services/imageService', () => ({
  salvarImage: jest.fn(),
  sendToLLM: jest.fn()
}));

describe('Image Endpoints', () => {

  describe('POST /api/uploadImage', () => {
    it('should save the image and return success message', async () => {
      (salvarImage as jest.Mock).mockResolvedValue('path/to/saved/image.png');

      const response = await request(app)
        .post('/api/uploadImage')
        .send({
          imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Imagem recebida e salva com sucesso');
      expect(response.body.filePath).toBe('path/to/saved/image.png');
    });

    it('should return 400 if imageBase64 is not provided', async () => {
      const response = await request(app)
        .post('/api/uploadImage')
        .send({});

      expect(response.status).toBe(400);
      expect(response.text).toBe('Imagem Base64 não fornecida');
    });
  });

  describe('POST /api/postImage', () => {
    it('should send the image to LLM and return the extracted value', async () => {
      (sendToLLM as jest.Mock).mockResolvedValue('extracted_value');

      const response = await request(app)
        .post('/api/postImage')
        .send({
          imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Imagem processada com sucesso');
      expect(response.body.value).toBe('extracted_value');
    });

    it('should return 400 if imageBase64 is not provided', async () => {
      const response = await request(app)
        .post('/api/postImage')
        .send({});

      expect(response.status).toBe(400);
      expect(response.text).toBe('Imagem Base64 não fornecida');
    });
  });

});
