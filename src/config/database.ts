import { ENV } from '../common/constants';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  url: ENV.DB.URL,
  host: ENV.DB.HOST,
  port: Number(ENV.DB.PORT),
  logging: ['query', 'error'],
  type: 'postgres',
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/**/*.{ts,js}'],
  database: ENV.DB.NAME,
  username: ENV.DB.USER,
  password: ENV.DB.PASSWORD,
  synchronize: true,
});

const initializeDBConnection = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    // eslint-disable-next-line no-console
    console.log('PostgresSQL Connected...');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    }
  }
};

export { AppDataSource, initializeDBConnection };
