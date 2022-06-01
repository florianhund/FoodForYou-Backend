export default {
  get: {
    tags: ['User Endpoints'],
    description: 'Get user by id',
    operationId: 'getUserById',
    parameters: [
      {
        name: 'id',
        in: 'params',
        schema: {
          $ref: '#/components/schemas/Id'
        },
        description: 'id to find'
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
                  $ref: '#/components/schemas/User'
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
              type: 'object',
              properties: {
                data: {
                  $ref: '#/components/schemas/Meal'
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
  },
  patch: {
    tags: ['User Endpoints'],
    description: 'update user',
    operationId: 'updateUser',
    parameters: [
      {
        name: 'id',
        in: 'params',
        schema: {
          $ref: '#/components/schemas/Id'
        },
        description: 'id to update'
      },
      {
        name: 'user',
        in: 'body',
        schema: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              example: 'John',
              maxLength: '20',
              description: 'first name'
            },
            lastName: {
              type: 'string',
              example: 'Doe',
              maxLength: '20',
              description: 'last name'
            },
            username: {
              type: 'string',
              example: 'john_doe38',
              description: 'username'
            },
            email: {
              type: 'string',
              example: 'john.doe@gmail.com',
              description: 'email'
            },
            birthday: {
              type: 'date',
              example: '1987-02.14',
              description: 'birthday'
            },
            password: {
              type: 'string',
              example: 'my_secReTpaSsword342',
              description: 'password'
            },
            address: {
              type: 'string',
              example: 'Teststreet 3',
              description: 'address'
            },
            postalCode: {
              type: 'number',
              example: '6060',
              description: 'postal code'
            },
            isVerified: {
              type: 'boolean',
              example: 'true',
              description: 'true if user is verified'
            },
            isAdmin: {
              type: 'boolean',
              example: 'false',
              description: 'true if user is admin'
            }
          }
        }
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
              $ref: '#/components/schemas/HttpError'
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
  },
  delete: {
    tags: ['User Endpoints'],
    description: 'delete user',
    operationId: 'deleteUsers',
    parameters: [
      {
        name: 'id',
        in: 'params',
        schema: {
          $ref: '#/components/schemas/Id'
        },
        description: 'id to delete'
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
              $ref: '#/components/schemas/HttpError'
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
