export default {
  base: {
    get: {
      tags: ['Meal Endpoints'],
      description: 'Get meals. Returns all meals if query is empty',
      operationId: 'getMeals',
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
            example: 'name,price'
          },
          description: 'list of fields'
        },
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
          name: 'min_rating',
          in: 'query',
          schema: {
            type: 'number',
            example: '6'
          },
          description: 'show meals with given rating or higher'
        },
        {
          name: 'max_calories',
          in: 'query',
          schema: {
            type: 'number',
            example: '400'
          },
          description: 'show meals with 400 calories or lower'
        },
        {
          name: 'tags',
          in: 'query',
          schema: {
            type: 'string',
            example: 'steak, tasty'
          },
          description: 'search meals by tags one or more tags'
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
              rating: {
                type: 'number',
                description: 'Rating of meal, must be int',
                min: 0,
                max: 10,
                example: '8'
              },
              calories: {
                type: 'number',
                description: 'Calories of meal',
                min: 0,
                example: '330'
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
