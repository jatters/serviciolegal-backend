const { mergeConfig } = require('vite');

module.exports = (config) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ['manager.serviciolegal.com.co','manager.lsconsulting.com.co', 'dev.einscube.com' ],
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
