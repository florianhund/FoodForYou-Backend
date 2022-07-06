export default {
  base: {
    get: {
      tags: ['User Endpoints'],
      description: 'Get users',
      operationId: 'getUsers',
      parameters: [
        {
          name: 'sort_by',
          in: 'query',
          schema: {
            type: 'string',
            example: 'lastName,-firstName'
          },
          description:
            'list of fields to sort. insert - before field for desc order'
        },
        {
          name: 'fields',
          in: 'query',
          schema: {
            type: 'string',
            example: 'firstName,lastName,email'
          },
          description: 'list of fields'
        },
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
  id: {
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
                $ref: '#/components/schemas/HttpError'
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
              email: {
                type: 'string',
                example: 'john.doe@gmail.com',
                description: 'email'
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
                $ref: '#/components/schemas/HttpError'
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
                $ref: '#/components/schemas/HttpError'
              }
            }
          }
        }
      }
    }
  },
  sendVerification: {
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
                $ref: '#/components/schemas/HttpError'
              }
            }
          }
        }
      }
    }
  },
  verify: {
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
                $ref: '#/components/schemas/HttpError'
              }
            }
          }
        }
      }
    }
  }
};
