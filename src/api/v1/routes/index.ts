import { Router } from 'express';

import MealController from '../controllers/MealController';

const mealController = new MealController();

const router: Router = Router();

router.use(mealController.path, mealController.setRoutes());

export default router;
