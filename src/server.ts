import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/', (_req, res) => {
  res.json({ message: '🔥🚀☄️' });
});

const server = app.listen(process.env.PORT || 4200, () =>
  console.log(`Server  started on port ${process.env.PORT || 4200}`),
);

export { app, server };
