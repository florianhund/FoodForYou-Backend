import { Schema } from 'express-validator';
import { Allergenics } from '../interfaces/types';

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
    errorMessage: 'Name cannot be empty'
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
  isVegetarian: {
    notEmpty: true,
    isBoolean: {
      errorMessage: 'isVegetarian has to be boolean value'
    },
    errorMessage: 'isVegetarian cannot be empty'
  },
  isVegan: {
    notEmpty: true,
    isBoolean: {
      errorMessage: 'isVegan has to be boolean value'
    },
    errorMessage: 'isVegan cannot be empty'
  },
  description: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 10, max: 60 }
    },
    errorMessage: 'Description must be between 10 and 60 characters'
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
    errorMessage: 'Name cannot be empty'
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
  isVegetarian: {
    isBoolean: {
      errorMessage: 'isVegetarian has to be boolean value'
    },
    optional: {
      options: { checkFalsy: true }
    }
  },
  isVegan: {
    isBoolean: {
      errorMessage: 'isVegan has to be boolean value'
    },
    optional: {
      options: { checkFalsy: true }
    }
  },
  description: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 10, max: 40 }
    },
    errorMessage: 'Description must be between 10 and 40 characters'
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
