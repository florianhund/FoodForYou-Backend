import { Request, Response, Router } from 'express';

import { MealController, UserController, AuthController } from '../controllers';

const mealController = new MealController();
const userController = new UserController();
const authController = new AuthController();

const router = Router();

router.use(mealController.path, mealController.setRoutes());
router.use(userController.path, userController.setRoutes());
router.use(authController.path, authController.setRoutes());

export const defaultHandler = (req: Request, res: Response) => {
  res.status(404).send();
};

export default router;
