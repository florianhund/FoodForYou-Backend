export default {
  get: {
    tags: ['Meal Endpoints'],
    description: 'get meal by id',
    operationId: 'getMealById',
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
                  $ref: '#/components/schemas/Meal'
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
    tags: ['Meal Endpoints'],
    description: 'update meal',
    operationId: 'updateMeal',
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
        in: 'body',
        name: 'meal',
        description: 'update body',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Id of Meal',
              length: 24,
              example: '6253f6610d5ef0a5f7cbde76'
            },
            name: {
              type: 'string',
              description: 'Name of Meal',
              minLength: 5,
              maxLength: 25,
              example: 'burger'
            },
            price: {
              type: 'number',
              description: 'Price of Meal',
              min: 0,
              max: 50,
              example: '8.5'
            },
            isVegetarian: {
              type: 'boolean',
              description: 'true if meal is vegetarian',
              example: 'false'
            },
            isVegan: {
              type: 'boolean',
              description: 'true if meal is vegan',
              example: 'false'
            },
            description: {
              type: 'string',
              description: 'Description of Meal',
              minLength: 10,
              maxLength: 40,
              example: 'This is a tasty Burger!'
            },
            allergenics: {
              type: 'array',
              items: {
                type: 'string',
                enum: [
                  'A',
                  'B',
                  'C',
                  'D',
                  'E',
                  'F',
                  'G',
                  'H',
                  'L',
                  'M',
                  'N',
                  'O',
                  'P',
                  'R'
                ]
              },
              description: 'Allergenics of Meal',
              example: ['A', 'E']
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
                minLength: 1,
                maxLength: 15
              },
              description: 'tags',
              example: ['steak, tasty, good']
            },
            __v: {
              type: 'number',
              description: 'version of Meal',
              example: 0
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
    tags: ['Meal Endpoints'],
    description: 'delete meal',
    operationId: 'deleteMealById',
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
