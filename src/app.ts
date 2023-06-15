import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { initApi } from './api';
import { handleErrorMiddleware } from './middlewares';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());

app.get('/', (_req, res) => {
  res.json({ message: '🔥🚀☄️' }).status(200);
});

initApi(app);

app.use(handleErrorMiddleware);
export default app;
