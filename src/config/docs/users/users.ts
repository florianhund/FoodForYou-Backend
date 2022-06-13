export default {
  get: {
    tags: ['User Endpoints'],
    description: 'Get users',
    operationId: 'getUsers',
    parameters: [
      {
        name: 'email',
        in: 'query',
        schmema: {
          type: 'string',
          example: 'john.doe@gmail.com'
        },
        description: 'find user by email'
      }
    ],
    responses: {
      200: {
        description: '200 OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: '400 Bad Request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/HttpError'
            }
          }
        }
      },
      500: {
        description: '500 Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error',
                  description: 'error message'
                }
              }
            }
          }
        }
      }
    }
  },
  post: {
    tags: ['User Endpoints'],
    description: 'create user',
    operationId: 'createUser',
    parameters: [
      {
        in: 'body',
        name: 'user',
        description: 'user to create',
        schema: {
          $ref: '#/components/schemas/User'
        }
      }
    ],
    responses: {
      201: {
        description: '201 Created',
        headers: {
          Location: {
            description: 'Location of created user',
            type: 'string'
          }
        }
      },
      400: {
        description: '400 Bad Request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/HttpError'
            }
          }
        }
      },
      500: {
        description: '500 Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error',
                  description: 'error message'
                }
              }
            }
          }
        }
      }
    }
  }
};
