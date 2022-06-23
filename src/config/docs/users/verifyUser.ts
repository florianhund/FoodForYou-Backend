export const sendVerification = {
  get: {
    tags: ['User Endpoints'],
    description: 'send email with otp code',
    operationId: 'sendUserVerifciation',
    parameters: [
      {
        name: 'id',
        in: 'params',
        schema: {
          $ref: '#/components/schemas/Id'
        },
        description: 'userid'
      }
    ],
    responses: {
      204: {
        description: '204 No Content'
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
      404: {
        description: '404 Not Found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid Id',
                  description: 'error message'
                }
              }
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

export const verify = {
  get: {
    tags: ['User Endpoints'],
    description: 'verify user',
    operationId: 'verifyUser',
    parameters: [
      {
        name: 'id',
        in: 'params',
        schema: {
          $ref: '#/components/schemas/Id'
        },
        description: 'userid'
      },
      {
        name: 'otp',
        in: 'query',
        schema: {
          type: 'number',
          example: '4178'
        },
        description: '4 digit verification code'
      }
    ],
    responses: {
      204: {
        description: '204 No Content'
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
      401: {
        description: '401 Unauthorized',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'wrong otp',
                  description: 'error message'
                }
              }
            }
          }
        }
      },
      404: {
        description: '404 Not Found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid Id',
                  description: 'error message'
                }
              }
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
