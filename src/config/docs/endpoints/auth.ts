export default {
  google: {
    get: {
      tags: ['Auth Endpoints'],
      description: 'Login using google. Open this endpoint with a browser',
      operationId: 'googleLogin'
    }
  },
  facebook: {
    get: {
      tags: ['Auth Endpoints'],
      description: 'Login using facebook. Open this endpoint with a browser',
      operationId: 'facebookLogin'
    }
  },
  login: {
    post: {
      tags: ['Auth Endpoints'],
      description: 'Login using email and password.',
      operationId: 'localLogin',
      parameters: [
        {
          in: 'body',
          name: 'email',
          description: 'user email',
          schema: {
            type: 'string',
            example: 'john.doe@gmail.com'
          }
        },
        {
          in: 'body',
          name: 'password',
          description: 'user password',
          schema: {
            type: 'string',
            example: 'MySecretpassword_2'
          }
        }
      ],
      responses: {
        302: {
          description: '302 Found'
        },
        400: {
          description: '400 Bad Request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError'
              }
            }
          }
        },
        500: {
          description: '500 Internal Server Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HttpError'
              }
            }
          }
        }
      }
    }
  },
  logout: {
    delete: {
      tags: ['Auth Endpoints'],
      description: 'Logout',
      operationId: 'logout',
      responses: {
        204: {
          description: '204 No Content'
        }
      }
    }
  }
};
