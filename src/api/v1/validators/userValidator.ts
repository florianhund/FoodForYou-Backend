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
    isString: true,
    errorMessage: 'firstName cannot be empty and string'
  },
  lastName: {
    notEmpty: true,
    isLength: {
      options: { max: 20 },
      errorMessage: 'lastName must have max 20 chars'
    },
    isString: true,
    errorMessage: 'lastName cannot be empty and string'
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
  password: {
    notEmpty: true,
    isStrongPassword: {
      errorMessage:
        'password must be 8 chars long, contain 1 upper and smaller letter, one number and one symbol'
    },
    errorMessage: 'password cannot be empty'
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
    isString: true,
    errorMessage: 'firstName cannot be empty and string'
  },
  lastName: {
    optional: {
      options: { checkFalsy: true }
    },
    isLength: {
      options: { max: 20 },
      errorMessage: 'lastName must have max 20 chars'
    },
    isString: true,
    errorMessage: 'lastName cannot be empty and string'
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
  },
  otp: {
    isEmpty: true,
    errorMessage: 'otp has to be empty'
  },
  provider: {
    isEmpty: true,
    errorMessage: 'provider has to be empty'
  },
  providerId: {
    isEmpty: true,
    errorMessage: 'providerId has to be empty'
  }
};

const verificationSchema: Schema = {
  otp: {
    notEmpty: true,
    isInt: true,
    errorMessage: 'otp cannot be null'
  }
};

export default {
  id: idSchema,
  create: createSchema,
  update: updateSchema,
  verification: verificationSchema
};
