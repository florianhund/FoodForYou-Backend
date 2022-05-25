import { Request, Response, Router } from 'express';

import { MealController, UserController } from '../controllers';

const mealController = new MealController();
const userController = new UserController();

const router = Router();

router.use(mealController.path, mealController.setRoutes());
router.use(userController.path, userController.setRoutes());

export const defaultHandler = (req: Request, res: Response) => {
  res.status(404).send();
};

export default router;
