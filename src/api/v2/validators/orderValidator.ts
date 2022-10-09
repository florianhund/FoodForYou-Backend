import { Schema } from 'express-validator';
import { IMeal, IUser } from '../interfaces/models';
import { Meal, User } from '../models';
import { hasNullishValues } from '../utils';

const idSchema: Schema = {
  id: {
    isLength: {
      options: { min: 24, max: 24 }
    },
    errorMessage: 'Id must be 24 characters long'
  }
};

const getSchema: Schema = {
  min_price: {
    optional: {
      options: { checkFalsy: true }
    },
    isFloat: true,
    errorMessage: 'min_price has to be a number'
  },
  max_price: {
    optional: {
      options: { checkFalsy: true }
    },
    isFloat: true,
    errorMessage: 'max_price has to be a number'
  },
  postalCode: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: true,
    errorMessage: 'postalCode has to be a number'
  },
  userId: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'Id must be 24 characters long'
    }
  },
  ordered_meals_ids: {
    optional: {
      options: { checkFalsy: true }
    },
    custom: {
      options: async (value: string) => {
        const ids = await Promise.all(
          value.split(',').map(id => {
            if (id.length !== 24)
              throw new Error('At least one given id is not 24 chars long');
            return Meal.findById(id);
          })
        );

        if (hasNullishValues(ids))
          throw new Error('At least one given id doesnt exist');
        return true;
      }
    }
  },
  isPaid: {
    optional: {
      options: { checkFalsy: true }
    },
    isBoolean: true,
    errorMessage: 'isPaid has to be boolean'
  },
  before: {
    optional: {
      options: { checkFalsy: true }
    },
    isDate: true,
    errorMessage: 'before has to be a date'
  },
  after: {
    optional: {
      options: { checkFalsy: true }
    },
    isDate: true,
    errorMessage: 'after has to be a date'
  }
};

const createSchema: Schema = {
  address: {
    notEmpty: true,
    isString: true,
    errorMessage: 'address cannot be empty and string'
  },
  postalCode: {
    notEmpty: true,
    isInt: true,
    errorMessage: 'postalCode cannot be empty and has to be a number'
  },
  'user.id': {
    notEmpty: true,
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'Id must be 24 characters long'
    },
    errorMessage: 'user id cannot be empty',
    custom: {
      options: async value => {
        const user: IUser | null = await User.findById(value);
        if (!user) throw new Error('No User with that Id');
        return true;
      }
    }
  },
  'user.ref': {
    isEmpty: true,
    errorMessage: 'User ref must be empty'
  },
  'user.href': {
    notEmpty: true,
    errorMessage: 'User href cannot be empty'
  },
  meals: {
    notEmpty: true,
    isArray: true,
    errorMessage: 'Meals cannot be empty'
  },
  'meals.*.id': {
    notEmpty: true,
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'Id must be 24 characters long'
    },
    errorMessage: 'meals has to have 1 item at least',
    custom: {
      options: async value => {
        const meal: IMeal | null = await Meal.findById(value);
        if (!meal) throw new Error('No Meal with that Id');
        return true;
      }
    }
  },
  'meals.*.ref': {
    isEmpty: true,
    errorMessage: 'Meal ref must be empty'
  }
};

const updateSchema: Schema = {
  postalCode: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: true,
    errorMessage: 'postalCode cannot be empty and has to be a number'
  },
  'user.id': {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'Id must be 24 characters long'
    },
    errorMessage: 'user id cannot be empty',
    custom: {
      options: async value => {
        const user: IUser | null = await User.findById(value);
        if (!user) throw new Error('No User with that Id');
        return true;
      }
    }
  },
  meals: {
    optional: {
      options: { checkFalsy: true }
    },
    isArray: true,
    errorMessage: 'Meals has to be array'
  },
  'meals.*.id': {
    notEmpty: true,
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'Id must be 24 characters long'
    },
    errorMessage: 'meals has to have 1 item at least',
    custom: {
      options: async value => {
        const meal: IMeal | null = await Meal.findById(value);
        if (!meal) throw new Error('No Meal with that Id');
        return true;
      }
    }
  },
  'meals.*.ref': {
    isEmpty: true,
    errorMessage: 'Meal ref must be empty'
  },
  orderTime: {
    isEmpty: true,
    errorMessage: 'orderTime has to be empty'
  },
  deliveryTime: {
    optional: {
      options: { checkFalsy: true }
    },
    isDate: true,
    errorMessage: 'deliveryTime has to be a date'
  },
  isPaid: {
    optional: {
      options: { checkFalsy: true }
    },
    isBoolean: true,
    errorMessage: 'isPaid has to be boolean'
  },
  isDelivered: {
    optional: {
      options: { checkFalsy: true }
    },
    isBoolean: true,
    errorMessage: 'isDelivered has to be boolean'
  },
  status: {
    optional: {
      options: { checkFalsy: true }
    },
    custom: {
      options: value => {
        const status = ['in progress', 'in delivery', 'delivered'];
        if (!status.includes(value)) throw new Error('Invalid status!');
        return true;
      }
    }
  },
  totalPrice: {
    isEmpty: true,
    errorMessage: 'cannot update totalPrice'
  },
  address: {
    optional: {
      options: { checkFalsy: true }
    },
    isString: true,
    errorMessage: 'address has to be a string'
  }
};

export default {
  id: idSchema,
  create: createSchema,
  update: updateSchema,
  get: getSchema
};
