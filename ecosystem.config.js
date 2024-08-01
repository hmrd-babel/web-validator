module.exports = {
  apps: [
    {
      name: 'web-validator',
      script: './server.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        FILE_PATH: "./node_modules/axe-core/axe.min.js"
      },
      env_production: {
        NODE_ENV: 'production',
        FILE_PATH: "./node_modules/axe-core/axe.min.js"
      }
    }
  ]
};