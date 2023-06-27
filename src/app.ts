import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import { initApi } from './api';
import { initializeDBConnection } from './config/database';
import { getJwtStrategy, handleErrorMiddleware } from './middlewares';

const app = express();

// Connect to PostgresDB
initializeDBConnection();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());
app.use(passport.initialize());
passport.use(getJwtStrategy());

app.get('/', (_req, res) => {
  res.json({ message: '🔥🚀☄️' }).status(200);
});

initApi(app);

app.use(handleErrorMiddleware);
export default app;
