import basicInfo from './basicInfo';
import components from './components';
import server from './server';
import tags from './tags';
import meals from './meals/meals';
import mealsId from './meals/meals_{id}';

export default {
  ...basicInfo,
  ...server,
  ...tags,
  ...components,
  paths: {
    '/meals': meals,
    '/meals/{id}': mealsId
  }
};
