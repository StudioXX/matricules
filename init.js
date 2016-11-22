const server = require('./server/server').server;
const config = require('./config/config');

server.listen(config.port, () => {
  console.log(`server started on port ${config.port} (${config.node_env})`);
});
