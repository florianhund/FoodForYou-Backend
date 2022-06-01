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
      User: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: 'first name of user',
            example: 'John'
          },
          lastName: {
            type: 'string',
            description: 'last name of user',
            example: 'Doe'
          },
          username: {
            type: 'string',
            description: 'username',
            example: 'john_doe8'
          },
          email: {
            type: 'string',
            description: 'email',
            example: 'john.doe@gmail.com'
          },
          birthday: {
            type: 'date',
            description: 'birthday',
            example: '2001-08-17'
          },
          password: {
            type: 'string',
            description: 'secret password',
            example: 'my_secret_password23'
          },
          address: {
            type: 'string',
            description: 'address where you live',
            example: 'teststreet'
          },
          postalCode: {
            type: 'string',
            description: 'postalCode of your home town',
            example: '6060'
          },
          isVerified: {
            type: 'boolean',
            description: 'true if user is verified',
            example: 'true',
            default: false
          },
          isAdmin: {
            type: 'boolean',
            description: 'true if user is admin',
            example: 'false',
            default: false
          },
          age: {
            type: 'number',
            description: 'virtual property',
            example: '19'
          },
          fullName: {
            type: 'string',
            description: 'virtual property',
            example: 'John Doe'
          }
        }
      },
      HttpError: {
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
