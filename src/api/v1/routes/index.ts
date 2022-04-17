import { Request, Response, Router } from 'express';

import { MealController, RestaurantController } from '../controllers';

const mealController = new MealController();
const restaurantController = new RestaurantController();

const router = Router();

router.use(mealController.path, mealController.setRoutes());
router.use(restaurantController.path, restaurantController.setRoutes());

export const defaultHandler = (req: Request, res: Response) => {
  res.status(404).send();
};

export default router;
