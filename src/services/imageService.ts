import fs from 'fs';
import path from 'path';

export const salvarImage = async (imageBase64: string): Promise<string> => {
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const uploadDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, `image_${Date.now()}.png`);
  fs.writeFileSync(filePath, buffer);

  return filePath;
};