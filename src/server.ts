import express from 'express';

const app = express();

app.use('/', (_req, res) => {
  res.send('Hello').status(200);
});

const server = app.listen(4200, () =>
  console.log(`Server  started on port ${4200}`),
);

export default server;
