import { Request, Response, Router } from 'express';

import {
  MealController,
  UserController,
  OrderController,
  AuthController,
  RestaurantController,
  ImageController
} from '../controllers';
import {
  MealService,
  UserService,
  OrderService,
  RestaurantService,
  ImageService
} from '../services';
import {
  MealRepository,
  OrderRepository,
  RestaurantRepository,
  UserRepository
} from '../repositories';
import cloudinary from '../../../config/cloudinary';

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

const imageController = new ImageController(new ImageService(cloudinary));

const router = Router();

router.use(mealController.path, mealController.setRoutes());
router.use(userController.path, userController.setRoutes());
router.use(restaurantController.path, restaurantController.setRoutes());
router.use(orderController.path, orderController.setRoutes());
router.use(authController.path, authController.setRoutes());
router.use(imageController.path, imageController.setRoutes());

export const defaultHandler = (req: Request, res: Response) => {
  res.sendStatus(404);
};

export default router;
