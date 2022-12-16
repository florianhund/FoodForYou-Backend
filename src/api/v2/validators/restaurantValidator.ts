import { Schema } from 'express-validator';

const idSchema: Schema = {
  id: {
    isLength: {
      options: { min: 24, max: 24 }
    },
    errorMessage: 'Id must be 24 characters long'
  }
};

const getSchema: Schema = {
  name: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Name must be between 5 and 25 characters'
    },
    isString: true,
    errorMessage: 'Name must be string'
  },
  min_rating: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: {
      options: { min: 0, max: 10 },
      errorMessage: 'Min_rating has to be int between 0 and 10 '
    },
    toInt: true
  },
  address: {
    optional: {
      options: { checkFalsy: true }
    },
    isString: true,
    errorMessage: 'Address has to be a string'
  },
  postalCode: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: true,
    errorMessage: 'PostalCode has to be an int number and cannot be null'
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
  rating: {
    notEmpty: true,
    isInt: {
      options: { min: 0, max: 10 },
      errorMessage: 'Rating has to be int between 0 and 10 '
    },
    errorMessage: 'Rating cannot be empty',
    toInt: true
  },
  address: {
    notEmpty: true,
    isString: true,
    errorMessage: 'Address has to be a string and cannot be empty'
  },
  postalCode: {
    notEmpty: true,
    isInt: true,
    errorMessage: 'PostalCode has to be an int number and canot be null'
  }
};

const updateSchema: Schema = {
  name: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Name must be between 5 and 25 characters'
    },
    isString: true,
    errorMessage: 'Name must be string'
  },
  rating: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: {
      options: { min: 0, max: 10 },
      errorMessage: 'Rating has to be int between 0 and 10 '
    },
    toInt: true
  },
  address: {
    optional: {
      options: { checkFalsy: true }
    },
    isString: true,
    errorMessage: 'Address has to be a string'
  },
  postalCode: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: true,
    errorMessage: 'PostalCode has to be an int number'
  }
};

export default {
  id: idSchema,
  get: getSchema,
  create: createSchema,
  update: updateSchema
};
