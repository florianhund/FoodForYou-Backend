import { Schema } from 'express-validator';
import { IMeal, IUser } from '../interfaces/models';
import { Meal, User } from '../models';

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
      options: async value => {
        value.split(',').forEach(async (id: string) => {
          const meal: IMeal | null = await Meal.findById(id);
          if (!meal) throw new Error('At least one given id doesnt exist');
        });
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
    errorMessage: 'address cannot be empty'
  },
  postalCode: {
    notEmpty: true,
    isInt: true,
    errorMessage: 'postalCode cannot be empty and has to be a number'
  },
  userId: {
    notEmpty: true,
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'Id must be 24 characters long'
    },
    errorMessage: 'userId cannot be empty',
    custom: {
      options: async value => {
        const user: IUser | null = await User.findById(value);
        if (!user) throw new Error('No User with that Id');
        return true;
      }
    }
  },
  meals: {
    notEmpty: true,
    isArray: true,
    errorMessage: 'Meals cannot be empty'
  },
  'meals.*': {
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
  }
};

// ! not finished
const updateSchema: Schema = {
  postalCode: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: true,
    errorMessage: 'postalCode cannot be empty and has to be a number'
  },
  userId: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'Id must be 24 characters long'
    },
    errorMessage: 'userId cannot be empty',
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
    errorMessage: 'Meals cannot be empty'
  },
  'meals.*': {
    optional: {
      options: { checkFalsy: true }
    },
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
  }
};

export default {
  id: idSchema,
  create: createSchema,
  update: updateSchema,
  get: getSchema
};
