import { Request, Response, Router } from 'express';

import {
  MealController,
  UserController,
  OrderController,
  AuthController
} from '../controllers';

const mealController = new MealController();
const userController = new UserController();
const orderController = new OrderController();
const authController = new AuthController();

const router = Router();

router.use(mealController.path, mealController.setRoutes());
router.use(userController.path, userController.setRoutes());
router.use(orderController.path, orderController.setRoutes());
router.use(authController.path, authController.setRoutes());

export const defaultHandler = (req: Request, res: Response) => {
  res.sendStatus(404);
};

export default router;
