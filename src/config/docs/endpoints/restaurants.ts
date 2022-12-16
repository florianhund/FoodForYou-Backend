export default {
  base: {
    get: {
      tags: ['Restaurant Endpoints'],
      description: 'Get restaurants. Returns all restaurants if query is empty',
      operationId: 'getRestaurants',
      parameters: [
        {
          name: 'sort_by',
          in: 'query',
          schema: {
            type: 'string',
            example: '-name'
          },
          description:
            'list of fields to sort. insert - before field for desc order'
        },
        {
          name: 'fields',
          in: 'query',
          schema: {
            type: 'string',
            example: 'name, rating'
          },
          description: 'list of fields'
        },
        {
          name: 'name',
          in: 'query',
          schema: {
            type: 'string',
            example: 'il mondo'
          },
          description: 'filter restaurants by given name'
        },
        {
          name: 'min_rating',
          in: 'query',
          schema: {
            type: 'number',
            example: 5
          },
          description: 'filter restaurants by rating'
        },
        {
          name: 'address',
          in: 'query',
          schema: {
            type: 'number',
            example: 'teststreet'
          },
          description: 'filter restaurants by address'
        },
        {
          name: 'postal_code',
          in: 'query',
          schema: {
            type: 'number',
            example: 6060
          },
          description: 'filter restaurants by postal code'
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
                      $ref: '#/components/schemas/Restaurant'
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
      tags: ['Restaurant Endpoints'],
      description: 'create a Restaurant',
      operationId: 'postRestaurant',
      parameters: [
        {
          in: 'body',
          name: 'restaurant',
          description: 'restaurant to create',
          schema: {
            $ref: '#/components/schemas/Restaurant'
          }
        }
      ],
      responses: {
        201: {
          description: '201 Created',
          headers: {
            Location: {
              description: 'Location of created restaurant',
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
      tags: ['Restaurant Endpoints'],
      description: 'get Restaurant by id',
      operationId: 'getRestaurantById',
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
                    $ref: '#/components/schemas/Restaurant'
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
      tags: ['Restaurant Endpoints'],
      description: 'update restaurant',
      operationId: 'updateRestaurant',
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
          name: 'restaurant',
          in: 'body',
          description: 'update body',
          schema: {
            $ref: '#/components/schemas/Restaurant'
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
      tags: ['Restaurant Endpoints'],
      description: 'delete restaurant',
      operationId: 'deleteRestaurantById',
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
  }
};
