const { CLIENT } = require('./tags');

exports.paths = {
  '/api/client/{id}': {
    get: {
      tags: [CLIENT.name],
      summary: 'Retrieve clients list',
      produces: 'application/json',
      responses: {
        200: {
          description: 'OK',
          schema: {
            type: 'array',
            items: { $ref: '#/definitions/Client' },
          },
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
    post: {
      tags: [CLIENT.name],
      summary: 'Creates new client',
      produces: 'application/json',
      parameters: [
        {
          name: 'name',
          in: 'body',
          description: 'Name to assign to the client',
          required: true,
        },
        {
          name: 'email',
          in: 'body',
          description: 'Email to assign to the client',
          required: true,
        },
        {
          name: 'phone',
          in: 'body',
          description: 'Phone to assign to the client',
          type: 'string',
          required: true,
        },
        {
          name: 'providers',
          in: 'body',
          description: 'List of provider id\'s',
          type: 'array',
          required: true,
        },
      ],
      responses: {
        201: {
          description: 'OK',
          schema: { $ref: '#/definitions/Client' },
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
      tags: [CLIENT.name],
      summary: 'Updates client by id',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Id of the client to edit',
          required: true,
        },
        {
          name: 'name',
          in: 'body',
          description: 'Name to assign to the client',
          required: true,
        },
        {
          name: 'email',
          in: 'body',
          description: 'Email to assign to the client',
          required: true,
        },
        {
          name: 'phone',
          in: 'body',
          description: 'Phone to assign to the client',
          type: 'string',
          required: true,
        },
        {
          name: 'providers',
          in: 'body',
          description: 'List of provider id\'s',
          type: 'array',
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: { $ref: '#/definitions/Client' },
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
      tags: [CLIENT.name],
      summary: 'Deletes client by id',
      produces: 'application/json',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Id of the client to delete',
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            type: 'array',
            items: { $ref: '#/definitions/Client' },
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
  Client: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      providers: { type: 'array' },
    },
  },
};
