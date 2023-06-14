import { config } from 'dotenv';

config();

const {
  NODE_ENV,
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_NAME,
  SECRET_KEY,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: NODE_ENV,
    SERVER_PORT: PORT,
  },
  DB: {
    NAME: POSTGRES_DB_NAME,
    HOST: POSTGRES_HOST,
    PORT: POSTGRES_PORT,
    USER: POSTGRES_USER,
    PASSWORD: POSTGRES_PASSWORD,
  },
  API: {
    V1_PREFIX: '/api/v1/',
  },
  JWT: {
    SECRET: SECRET_KEY,
  },
};

export { ENV };
