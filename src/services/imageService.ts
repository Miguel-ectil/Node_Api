import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';

export const salvarImage = async (imageBase64: string): Promise<string> => {
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const uploadDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Ensure recursive creation
  }

  const filePath = path.join(uploadDir, `image_${Date.now()}.png`);
  fs.writeFileSync(filePath, buffer);

  return filePath;
};

export const sendToLLM = async (filePath: string): Promise<string> => {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post('https://api.gemini.com', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${process.env.API_KEY}` 
      }
    });
    return response.data.value;
  } catch (error: any) {
    throw new Error('Erro ao contatar a API de LLM: ' + error.message);
  }
};