import { Schema } from 'express-validator';

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
      options: { min: 0, max: 50.0 }
    },
    errorMessage: 'Price has to be a floating point number between 0 and 50.0',
    toInt: true
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
    notEmpty: true
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
    isLength: {
      options: { min: 1, max: 1 }
    },
    errorMessage: 'Allergenic has to be 1 character long'
  }
};

export default {
  create: createSchema,
  id: idSchema,
  update: updateSchema
};
