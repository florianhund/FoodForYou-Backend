export default {
  components: {
    schemas: {
      id: {
        type: 'string',
        description: 'ObjectId',
        example: '6253f6610d5ef0a5f7cbde76'
      },
      Meal: {
        type: 'object',
        required: ['name, price, allergenics'],
        properties: {
          id: {
            type: 'string',
            description: 'Id of Meal',
            example: '6253f6610d5ef0a5f7cbde76'
          },
          name: {
            type: 'string',
            description: 'Name of Meal',
            example: 'burger'
          },
          price: {
            type: 'number',
            description: 'Price of Meal',
            example: '8.5'
          },
          description: {
            type: 'string',
            description: 'Description of Meal',
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
          __v: {
            type: 'number',
            description: 'version of Meal',
            example: 0
          }
        }
      },
      ValidationError: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'min_price has to be a number',
                  description: 'error message'
                },
                location: {
                  type: 'string',
                  example: 'query',
                  description: 'location of error'
                },
                param: {
                  type: 'string',
                  example: 'min_price',
                  description: 'name of field where error occurred'
                },
                value: {
                  type: 'string',
                  example: 'nonumber',
                  description: 'given input of error field'
                }
              }
            }
          }
        }
      }
    }
  }
};
