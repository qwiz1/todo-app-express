import app from './app';
import { ENV } from './common/constants';
import { initializeDBConnection } from './config/database';

// Connect to PostgresDB
initializeDBConnection();

const port = ENV.APP.SERVER_PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening: http://localhost:${port}`);
});
