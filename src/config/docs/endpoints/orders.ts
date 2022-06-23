export default {
  base: {
    get: {
      tags: ['Order Endpoints'],
      description: 'Get orders. Returns all orders if query is empty',
      operationId: 'getOrders',
      parameters: [
        {
          name: 'sort_by',
          in: 'query',
          schema: {
            type: 'string',
            example: '-totalPrice'
          },
          description:
            'list of fields to sort. insert - before field for desc order'
        },
        {
          name: 'fields',
          in: 'query',
          schema: {
            type: 'string',
            example: 'userId, meals'
          },
          description: 'list of fields'
        },
        {
          name: 'ordered_meals_ids',
          in: 'query',
          schema: {
            type: 'string',
            example: '6293cd8bec9db4c3cbb85155,6293cd8bec9db4c3cbb85312'
          },
          description: 'filter including meals'
        },
        {
          name: 'user_id',
          in: 'query',
          schema: {
            type: 'string',
            example: '6293cd8bec9db4c3cbb85155'
          },
          description: 'userid'
        },
        {
          name: 'min_price',
          in: 'query',
          schema: {
            type: 'number',
            example: '20'
          },
          description: 'min_price'
        },
        {
          name: 'max_price',
          in: 'query',
          schema: {
            type: 'number',
            example: '15'
          },
          description: 'max price'
        },
        {
          name: 'postalCode',
          in: 'query',
          schema: {
            type: 'number',
            example: '6112'
          },
          description: 'postalCode'
        },
        {
          name: 'address',
          in: 'query',
          schema: {
            type: 'string',
            example: 'some street'
          },
          description: 'address'
        },
        {
          name: 'isPaid',
          in: 'query',
          schema: {
            type: 'boolean',
            example: 'false'
          },
          description: 'checks if order is paid'
        },
        {
          name: 'before',
          in: 'query',
          schema: {
            type: 'string',
            example: '2022-06-30'
          },
          description:
            'checks if user is before date excluding the day of the date.'
        },
        {
          name: 'after',
          in: 'query',
          schema: {
            type: 'string',
            example: '2022-06-23'
          },
          description:
            'checks if user is after date including the day of the date.'
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
                      $ref: '#/components/schemas/Order'
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
      tags: ['Order Endpoints'],
      description: 'create a order',
      operationId: 'postOrder',
      parameters: [
        {
          in: 'body',
          name: 'order',
          description: 'order to create',
          schema: {
            type: 'object',
            properties: {
              address: {
                type: 'string',
                example: 'some street',
                description: 'address'
              },
              postalCode: {
                type: 'number',
                example: '6060',
                description: 'postal code'
              },
              userId: {
                type: 'string',
                example: '6293cd8bec9db4c3cbb85155',
                description: 'user id'
              },
              meals: {
                type: 'array',
                items: {
                  type: 'string'
                },
                example: ['6293cd8bec9db4c3cbb85155'],
                description: 'array of ids of meals'
              }
            }
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
  },
  id: {
    get: {
      tags: ['Order Endpoints'],
      description: 'Get order by id',
      operationId: 'getOrdererById',
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
                    $ref: '#/components/schemas/Order'
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
      tags: ['Order Endpoints'],
      description: 'update order',
      operationId: 'updateOrder',
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
              address: {
                type: 'string',
                example: 'some street',
                description: 'address'
              },
              postalCode: {
                type: 'number',
                example: '6060',
                description: 'postal code'
              },
              userId: {
                type: 'string',
                example: '6293cd8bec9db4c3cbb85155',
                description: 'user id'
              },
              meals: {
                type: 'array',
                items: {
                  type: 'string'
                },
                example: ['6293cd8bec9db4c3cbb85155'],
                description: 'array of ids of meals'
              },
              deliveryTime: {
                type: 'string',
                example: '2022-06-23T19:58:32.873Z',
                description: 'delivery Time'
              },
              isPaid: {
                type: 'boolean',
                example: 'false',
                description: 'true if order is paid'
              },
              isDelivered: {
                type: 'boolean',
                example: 'false',
                description: 'true if order is delivered'
              },
              status: {
                type: 'string',
                example: 'in delivery',
                enum: ['in progress', 'in delivery', 'delivered'],
                description:
                  'in progress before delivery, in delivery during delivery, delivered if delivered'
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
      tags: ['Order Endpoints'],
      description: 'delete order',
      operationId: 'deleteOrder',
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
  }
};
