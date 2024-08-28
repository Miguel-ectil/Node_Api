import app from './app';
import bodyParser from 'body-parser';
import imageRoutes from './routes/index';

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', imageRoutes);

app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
