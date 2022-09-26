import { Request, Response, Router } from 'express';

import {
  MealController,
  UserController,
  OrderController,
  AuthController,
  RestaurantController
} from '../controllers';
import {
  MealService,
  UserService,
  OrderService,
  RestaurantService
} from '../services';
import {
  MealRepository,
  OrderRepository,
  RestaurantRepository,
  UserRepository
} from '../repositories';

const mealController = new MealController(
  new MealService(new MealRepository())
);
const userController = new UserController(
  new UserService(new UserRepository())
);

const restaurantController = new RestaurantController(
  new RestaurantService(new RestaurantRepository())
);

const orderController = new OrderController(
  new OrderService(new OrderRepository())
);
const authController = new AuthController();

const router = Router();

router.use(mealController.path, mealController.setRoutes());
router.use(userController.path, userController.setRoutes());
router.use(restaurantController.path, restaurantController.setRoutes());
router.use(orderController.path, orderController.setRoutes());
router.use(authController.path, authController.setRoutes());

export const defaultHandler = (req: Request, res: Response) => {
  res.sendStatus(404);
};

export default router;
