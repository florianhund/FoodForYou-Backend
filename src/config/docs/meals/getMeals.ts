export default {
  get: {
    tags: ['Meal Endpoints'],
    description: 'Get meals',
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
        name: 'fields',
        in: 'query',
        schema: {
          type: 'string',
          example: 'name,price'
        },
        description: 'get only specific fields of meals'
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
        description: '200 ok',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Meal'
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
