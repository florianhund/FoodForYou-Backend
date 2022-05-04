export default {
  components: {
    schemas: {
      Id: {
        type: 'string',
        description: 'ObjectId',
        example: '6253f6610d5ef0a5f7cbde76'
      },
      Meal: {
        type: 'object',
        required: ['name, price', 'isVegetarian', 'isVegan'],
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
