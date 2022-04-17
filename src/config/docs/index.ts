import basicInfo from './basicInfo';
import components from './components';
import server from './server';
import tags from './tags';
import getMeals from './meals/getMeals';

export default {
  ...basicInfo,
  ...server,
  ...tags,
  ...components,
  paths: {
    '/meals': getMeals
  }
};
