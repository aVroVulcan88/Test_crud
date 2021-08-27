const { CLIENT, PROVIDER } = require('./tags');
const { paths: clientPath, definitions: clientDefinitions } = require('./clients');
const { paths: providersPath, definitions: providerDefinitions } = require('./provider');

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'MEVN CRUD documentation',
    description: 'Test MEVN application',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
  ],
  tags: [CLIENT, PROVIDER],
  paths: {
    ...clientPath,
    ...providersPath,
  },
  definitions: {
    ...clientDefinitions,
    ...providerDefinitions,
  },

};
