import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import imageRoutes from '../routes/index';

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api', imageRoutes);

describe('POST /api/getImagem', () => {
  it('should save the image and return success message', async () => {
    const response = await request(app)
      .post('/api/getImagem')
      .send({
        imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Imagem recebida e salva com sucesso');
  });

  it('should return 400 if imageBase64 is not provided', async () => {
    const response = await request(app)
      .post('/api/getImagem')
      .send({});

    expect(response.status).toBe(400);
    expect(response.text).toBe('Imagem Base64 não fornecida');
  });
});