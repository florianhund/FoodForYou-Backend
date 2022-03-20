import { Router } from 'express';

import MealController from '../controller/MealController';
import RestaurantController from '../controller/RestaurantController';

const mealController = new MealController();
const rstController = new RestaurantController();

const router: Router = Router();

router.use(mealController.path, mealController.setRoutes());
router.use(rstController.path, rstController.setRoutes());

export default router;
