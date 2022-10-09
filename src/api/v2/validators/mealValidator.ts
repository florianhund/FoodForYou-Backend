import { Schema } from 'express-validator';
import { IRestaurant } from '../interfaces/models';

import { Allergenics, MealTag } from '../interfaces/types';
import { Restaurant } from '../models';

const idSchema: Schema = {
  id: {
    isLength: {
      options: { min: 24, max: 24 }
    },
    errorMessage: 'Id must be 24 characters long'
  }
};

const createSchema: Schema = {
  name: {
    notEmpty: true,
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Name must be between 5 and 25 characters'
    },
    isString: true,
    errorMessage: 'Name cannot be empty and must be string'
  },
  price: {
    notEmpty: true,
    isFloat: {
      options: { min: 0, max: 50.0 },
      errorMessage: 'Price has to be a floating point number between 0 and 50.0'
    },
    errorMessage: 'Price cannot be empty',
    toInt: true
  },
  rating: {
    notEmpty: true,
    isInt: {
      options: { min: 0, max: 10 },
      errorMessage: 'Rating has to be a int number between 0 and 10'
    },
    errorMessage: 'Rating cannot be empty',
    toInt: true
  },
  isVegan: {
    isEmpty: true,
    errorMessage: 'isVegan has to be empty'
  },
  isVegetarian: {
    isEmpty: true,
    errorMessage: 'isVegetarian has to be empty'
  },
  calories: {
    notEmpty: true,
    isInt: {
      options: { min: 0, max: 2000 },
      errorMessage:
        'Calories has to be a positive int number and less than 2000'
    },
    errorMessage: 'Calories cannot be empty',
    toInt: true
  },
  'restaurant.id': {
    notEmpty: true,
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'Id must be 24 characters long'
    },
    custom: {
      options: async value => {
        const restaurant: IRestaurant | null = await Restaurant.findById(value);
        if (!restaurant) throw new Error('No Restaurant with this id');
        return true;
      }
    },
    errorMessage: 'Restaurant id cannot be empty'
  },
  'restaurant.ref': {
    notEmpty: true,
    errorMessage: 'Restaurant ref cannot be empty'
  },
  'restaurant.href': {
    notEmpty: true,
    errorMessage: 'Restaurant href cannot be empty'
  },
  description: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 10, max: 60 }
    },
    isString: true,
    errorMessage:
      'Description must be between 10 and 60 characters and must be string'
  },
  allergenics: {
    optional: {
      options: { checkFalsy: true }
    },
    isArray: true,
    errorMessage: 'Allergenics must be an array of characters'
  },
  'allergenics.*': {
    notEmpty: true,
    isIn: {
      options: [Allergenics],
      errorMessage: 'Invalid Allergenic'
    },
    errorMessage: 'Allergenic cannot be empty'
  },
  tags: {
    optional: {
      options: { checkFalsy: true }
    },
    isArray: true,
    errorMessage: 'Tags must be an array of Strings'
  },
  'tags.*': {
    isString: true,
    notEmpty: true,
    isIn: {
      options: [Object.values(MealTag)],
      errorMessage: 'Invalid Tag'
    },
    isLength: {
      options: { min: 1, max: 15 }
    },
    errorMessage: 'Tag must be between 1 and 25 chars long and string'
  }
};

const updateSchema: Schema = {
  name: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Name must be between 5 and 25 character'
    },
    isString: true,
    errorMessage: 'Name cannot be empty and must be string'
  },
  price: {
    optional: {
      options: { checkFalsy: true }
    },
    isFloat: {
      options: { min: 0, max: 50.0 }
    },
    errorMessage: 'Price has to be a floating point number between 0 and 50.0',
    toInt: true
  },
  rating: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: {
      options: { min: 0, max: 10 },
      errorMessage: 'Rating has to be a int number between 0 and 10'
    },
    errorMessage: 'Rating cannot be empty',
    toInt: true
  },
  isVegan: {
    isEmpty: true,
    errorMessage: 'isVegan has to be empty'
  },
  isVegetarian: {
    isEmpty: true,
    errorMessage: 'isVegetarian has to be empty'
  },
  calories: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: {
      options: { min: 0, max: 2000 },
      errorMessage:
        'Calories has to be a positive int number and less than 2000'
    },
    errorMessage: 'Calories cannot be empty',
    toInt: true
  },
  'restaurant.id': {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'Id must be 24 characters long'
    },
    custom: {
      options: async value => {
        const restaurant: IRestaurant | null = await Restaurant.findById(value);
        if (!restaurant) throw new Error('No Restaurant with this id');
        return true;
      }
    }
  },
  description: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 10, max: 40 }
    },
    isString: true,
    errorMessage:
      'Description must be between 10 and 40 characters and must be string'
  },
  allergenics: {
    optional: {
      options: { checkFalsy: true }
    },
    isArray: true,
    errorMessage: 'Allergenics must be an array of characters'
  },
  'allergenics.*': {
    notEmpty: true,
    isIn: {
      options: [Allergenics],
      errorMessage: 'Invalid Allergenic'
    },
    errorMessage: 'Allergenic cannot be empty'
  },
  tags: {
    optional: {
      options: { checkFalsy: true }
    },
    isArray: true,
    errorMessage: 'Tags must be an array of Strings'
  },
  'tags.*': {
    notEmpty: true,
    isIn: {
      options: [Object.values(MealTag)],
      errorMessage: 'Invalid Tag'
    },
    isLength: {
      options: { min: 1, max: 15 }
    },
    errorMessage: 'Tag must be between 1 and 25 chars long'
  }
};

const getSchema: Schema = {
  min_price: {
    optional: {
      options: { checkFalsy: true }
    },
    isFloat: true,
    errorMessage: 'min_price has to be a floating point number'
  },
  max_price: {
    optional: {
      options: { checkFalsy: true }
    },
    isFloat: true,
    errorMessage: 'max_price has to be a floating point number'
  },
  isVegetarian: {
    isBoolean: {
      errorMessage: 'isVegetarian has to be a boolean'
    },
    optional: {
      options: { checkFalsy: true }
    }
  },
  isVegan: {
    isBoolean: {
      errorMessage: 'isVegan has to be a boolean'
    },
    optional: {
      options: { checkFalsy: true }
    }
  },
  without_allergenics: {
    optional: {
      options: { checkFalsy: true }
    },
    custom: {
      options: value => {
        value.split(',').forEach((allergenic: string) => {
          if (!Object.keys(Allergenics).includes(allergenic)) {
            throw new Error('At least one given String is no ALlergenic!');
          }
        });
        return true;
      }
    }
  }
};

export default {
  create: createSchema,
  id: idSchema,
  update: updateSchema,
  get: getSchema
};
