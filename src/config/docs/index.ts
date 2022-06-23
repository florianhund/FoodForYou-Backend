import basicInfo from './basicInfo';
import components from './components';
import server from './server';
import tags from './tags';
import meals from './meals/meals';
import mealsId from './meals/meals_{id}';
import users from './users/users';
import usersId from './users/users_{id}';
import { sendVerification, verify } from './users/verifyUser';
import auth from './endpoints/auth';
import orders from './endpoints/orders';

export default {
  ...basicInfo,
  ...server,
  ...tags,
  ...components,
  paths: {
    '/meals': meals,
    '/meals/{id}': mealsId,
    '/users': users,
    '/users/{id}': usersId,
    '/users/{id}/send-verification': sendVerification,
    '/users/{id}/verify': verify,
    '/auth/google': auth.google,
    '/auth/facebook': auth.facebook,
    '/auth/login': auth.login,
    '/auth/logout': auth.logout,
    '/orders': orders.base,
    '/orders/:id': orders.id
  }
};
