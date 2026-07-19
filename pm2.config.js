module.exports = {
  apps: [
    {
      name: "minha-api",
      script: "dist/server.js",
      instances: "2",
      interpreter: "node",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};