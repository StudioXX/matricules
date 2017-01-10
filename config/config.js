module.exports = {
  port: process.env.PORT || 4000,
  mongo: process.env.MONGODB_URI || require('./secret.js').mongo,
  secret: process.env.TOKEN_SECRET || require('./secret.js').secret,
  node_env: process.env.NODE_ENV || 'development',
  morgan_log_level: process.env.MORGAN_LOG_LEVEL || 'dev',
};
