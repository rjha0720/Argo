const express = require('express');
const client = require('prom-client');

const PORT = 3000;
const register = client.register;
client.collectDefaultMetrics({ register });
const requests  = new client.Counter({
  name: 'app_1_requests_total',
  help: 'Current total app-1 requests',
});
const notFound = new client.Counter({
  name: 'app_1_not_founds_total',
  help: 'Current total app-1 not founds',
});
const app = express();

app.get('/', async (req, res) => {
  requests.inc();
  res.send('Hello World 2!');
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

app.use((req, res, next) => {
  requests.inc();
  notFound.inc();
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
