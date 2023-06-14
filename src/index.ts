import app from './app';
import { ENV } from './common/constants';

const port = ENV.APP.SERVER_PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening: http://localhost:${port}`);
});
