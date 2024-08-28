import express from 'express';
import bodyParser from 'body-parser';
import imageRoutes from './routes/index';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api', imageRoutes);

export default app;
