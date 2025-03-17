const { mergeConfig } = require('vite');

module.exports = (config) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ['dev.einscube.com', 'manager.serviciolegal.com.co','manager.lsconsulting.com.co' ],
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
