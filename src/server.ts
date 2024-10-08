// import app from './app';
import express from 'express';
import bodyParser from 'body-parser';
import imageRoutes from './routes/index';

// const PORT = process.env.PORT || 4000;
const app = express();
const PORT = 4000;

app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', imageRoutes);

app.listen(PORT, () => {
  console.log(`O servidor está sendo executado na porta ${PORT}`);
});
