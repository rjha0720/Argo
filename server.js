const express = require('express');
const client = require('prom-client');

const PORT = 3000;

const register = new client.Registry();
client.collectDefaultMetrics({ register });
const app = express();

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.send(metrics);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

