import { Schema } from 'express-validator';
import { IUser } from '../interfaces/models';
import { User } from '../models';

// ! is empty only for strings
const idSchema: Schema = {
  id: {
    isLength: {
      options: { min: 24, max: 24 }
    },
    errorMessage: 'Id must be 24 characters long'
  }
};

const createSchema: Schema = {
  firstName: {
    notEmpty: true,
    isLength: {
      options: { max: 20 },
      errorMessage: 'firstName must have max 20 chars'
    },
    errorMessage: 'firstName cannot be empty'
  },
  lastName: {
    notEmpty: true,
    isLength: {
      options: { max: 20 },
      errorMessage: 'lastName must have max 20 chars'
    },
    errorMessage: 'lastName cannot be empty'
  },
  username: {
    notEmpty: true,
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: 'username must be between 5 and 20 characters long'
    },
    errorMessage: 'username cannot be empty',
    custom: {
      options: async value => {
        const userByUsername: IUser | null = await User.findOne({
          username: value
        });
        if (userByUsername) throw new Error('username address is already used');
        return true;
      }
    }
  },
  email: {
    notEmpty: true,
    isEmail: true,
    errorMessage: 'email has to be an email and not empty',
    custom: {
      options: async value => {
        const userByEmail: IUser | null = await User.findOne({ email: value });
        if (userByEmail) throw new Error('email address is already used');
        return true;
      }
    }
  },
  birthday: {
    notEmpty: true,
    isISO8601: true,
    toDate: true,
    errorMessage: 'birthday has to be a date and not empty'
    // yyyy:mm:dd
  },
  password: {
    notEmpty: true,
    isStrongPassword: {
      errorMessage:
        'password must be 8 chars long, contain 1 upper and smaller letter, one number and one symbol'
    },
    errorMessage: 'password cannot be empty'
  },
  address: {
    notEmpty: true,
    isLength: {
      options: {
        max: 40
      },
      errorMessage: 'address has to be max 40 chars long'
    },
    errorMessage: 'adress cannot be empty'
  },
  postalCode: {
    notEmpty: true,
    isInt: true,
    errorMessage: 'postalCode has to be int number and not empty'
  },
  isVerified: {
    isEmpty: true,
    errorMessage: 'isVerified has to be empty'
  },
  isAdmin: {
    isEmpty: true,
    errorMessage: 'isAdmin has to be empty'
  }
};

const updateSchema: Schema = {
  firstName: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { max: 20 },
      errorMessage: 'firstName must have max 20 chars'
    },
    errorMessage: 'firstName cannot be empty'
  },
  lastName: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { max: 20 },
      errorMessage: 'lastName must have max 20 chars'
    },
    errorMessage: 'lastName cannot be empty'
  },
  username: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { min: 8, max: 30 },
      errorMessage: 'username must be between 5 and 25 characters long'
    },
    errorMessage: 'username cannot be empty',
    custom: {
      options: async value => {
        const userByUsername: IUser | null = await User.findOne({
          username: value
        });
        if (userByUsername) throw new Error('username address is already used');
        return true;
      }
    }
  },
  email: {
    optional: {
      options: { checkFalsy: true }
    },
    isEmail: true,
    errorMessage: 'email has to be an email and not empty',
    custom: {
      options: async value => {
        const userByEmail: IUser | null = await User.findOne({
          email: value
        });
        if (userByEmail) throw new Error('email address is already used');
        return true;
      }
    }
  },
  birthday: {
    optional: {
      options: { checkFalsy: true }
    },
    isISO8601: true,
    toDate: true,
    errorMessage: 'birthday has to be a date and not empty'
    // yyyy:mm:dd
  },
  password: {
    optional: {
      options: { checkFalsy: true }
    },
    isStrongPassword: {
      errorMessage:
        'password must be 8 chars long, contain 1 upper and smaller letter, one number and one symbol'
    },
    errorMessage: 'password cannot be empty'
  },
  address: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: {
        max: 40
      },
      errorMessage: 'address has to be max 40 chars long'
    },
    errorMessage: 'adress cannot be empty'
  },
  postalCode: {
    optional: {
      options: { checkFalsy: true }
    },
    isInt: true,
    errorMessage: 'postalCode has to be int number and not empty'
  },
  isVerified: {
    optional: {
      options: { checkFalsy: true }
    },
    isBoolean: true,
    isEmpty: true,
    errorMessage: 'isVerified has to be boolean'
  },
  isAdmin: {
    isEmpty: true,
    errorMessage: 'isAdmin has to be empty'
  }
};

const verificationSchema: Schema = {
  otp: {
    notEmpty: true,
    errorMessage: 'otp cannot be null'
  }
};

export default {
  id: idSchema,
  create: createSchema,
  update: updateSchema,
  verification: verificationSchema
};
