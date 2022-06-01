export default {
  get: {
    tags: ['Meal Endpoints'],
    description: 'Get meals. Returns all meals if query is empty',
    operationId: 'getMeals',
    parameters: [
      {
        name: 'name',
        in: 'query',
        schema: {
          type: 'string',
          example: 'pizza'
        },
        description: 'filter meals by given name'
      },
      {
        name: 'min_price',
        in: 'query',
        schema: {
          type: 'number',
          example: 3
        },
        description: 'filter meals by minprice'
      },
      {
        name: 'max_price',
        in: 'query',
        schema: {
          type: 'number',
          example: 10
        },
        description: 'filter meals by maxprice'
      },
      {
        name: 'without_allergenics',
        in: 'query',
        schema: {
          type: 'string',
          example: 'B,C,H'
        },
        description: 'filter meals by excluding allergenics'
      },
      {
        name: 'isVegetarian',
        in: 'query',
        schema: {
          type: 'boolean',
          example: 'false'
        },
        description: 'true if meal is vegetarian'
      },
      {
        name: 'isVegan',
        in: 'query',
        schema: {
          type: 'boolean',
          example: 'false'
        },
        description: 'true if meal is vegan'
      },
      {
        name: 'fields',
        in: 'query',
        schema: {
          type: 'string',
          example: 'name,price'
        },
        description: 'get only specific fields of meals'
      },
      {
        name: 'tags',
        in: 'query',
        schema: {
          type: 'string',
          example: 'steak, tasty'
        },
        description: 'search meals by tags one or more tags'
      },
      {
        name: 'sort_by',
        in: 'query',
        schema: {
          type: 'string',
          example: '-name,price'
        },
        description:
          'specify order of meals by setting fields to order. add - before field for desc order'
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
                    $ref: '#/components/schemas/Meal'
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
  },
  post: {
    tags: ['Meal Endpoints'],
    description: 'create a meal',
    operationId: 'postMeal',
    parameters: [
      {
        in: 'body',
        name: 'meal',
        description: 'meal to create',
        schema: {
          $ref: '#/components/schemas/Meal'
        }
      }
    ],
    responses: {
      201: {
        description: '201 Created',
        headers: {
          Location: {
            description: 'Location of created meal',
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
