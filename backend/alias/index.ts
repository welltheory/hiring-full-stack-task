const path = require('path');
require('better-module-alias')(path.join(__dirname, '..'), {
  '$root': '.',
  '$envs': './envs',
  '$services': './src/services',
  '$queries': './src/queries',
  '$controllers': './src/controllers',
  '$middleware': './src/middleware',
  '$dtos': './src/dtos',
  '$events': './src/events',
  '$models': './src/models',
  '$utils': './src/utils',
  '$types': './src/types',
  '$entities': './src/entities',
  '$mappers': './src/mappers',
  '$repositories': './src/repositories',
  '$prisma': './prisma',
  '$temporal': './src/temporal',
});

export {};
