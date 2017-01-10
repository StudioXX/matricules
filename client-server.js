const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();

  server.get('/document/:id', (req, res) => {
    return app.render(req, res, '/document', req.params);
  });

  server.get('/edit/:id', (req, res) => {
    return app.render(req, res, '/edit', req.params);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000');
  });
});
