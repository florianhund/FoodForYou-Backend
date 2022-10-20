import basicInfo from './basicInfo';
import components from './components';
import server from './server';
import tags from './tags';
import auth from './endpoints/auth';
import orders from './endpoints/orders';
import users from './endpoints/users';
import meals from './endpoints/meals';
import restaurants from './endpoints/restaurants';
import images from './endpoints/images';

export default {
  ...basicInfo,
  ...server,
  ...tags,
  ...components,
  paths: {
    '/meals': meals.base,
    '/meals/{id}': meals.id,
    '/users': users.base,
    '/users/{id}': users.id,
    '/users/{id}/send-verification': users.sendVerification,
    '/users/{id}/verify': users.verify,
    '/restaurants': restaurants.base,
    '/restaurants/{id}': restaurants.id,
    '/auth/google': auth.google,
    '/auth/facebook': auth.facebook,
    '/auth/login': auth.login,
    '/auth/logout': auth.logout,
    '/orders': orders.base,
    '/orders/{id}': orders.id,
    '/images': images.base,
    '/images/{id}': images.id
  }
};
