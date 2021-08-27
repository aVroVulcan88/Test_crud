const { PROVIDER } = require('./tags');

exports.paths = {
  '/api/provider/{id}': {
    get: {
      tags: [PROVIDER.name],
      summary: 'Retrieve provider list',
      produces: 'application/json',
      responses: {
        200: {
          description: 'OK',
          schema: {
            type: 'array',
            items: { $ref: '#/definitions/Provider' },
          },
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
    post: {
      tags: [PROVIDER.name],
      summary: 'Creates new provider',
      produces: 'application/json',
      parameters: [
        {
          name: 'name',
          in: 'body',
          description: 'Name to assign to the provider',
          required: true,
        },
      ],
      responses: {
        201: {
          description: 'OK',
          schema: { $ref: '#/definitions/Provider' },
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
    put: {
      tags: [PROVIDER.name],
      summary: 'Updates provider by id',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Id of the provider to edit',
          required: true,
        },
        {
          name: 'name',
          in: 'body',
          description: 'Name to assign to the provider',
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: { $ref: '#/definitions/Provider' },
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
    delete: {
      tags: [PROVIDER.name],
      summary: 'Deletes provider by id',
      produces: 'application/json',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Id of the provider to delete',
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            type: 'array',
            items: { $ref: '#/definitions/Provider' },
          },
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};

exports.definitions = {
  Provider: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
  },
};
