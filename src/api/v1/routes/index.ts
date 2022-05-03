import { Request, Response, Router } from 'express';

import { MealController } from '../controllers';

const mealController = new MealController();

const router = Router();

router.use(mealController.path, mealController.setRoutes());

export const defaultHandler = (req: Request, res: Response) => {
  res.status(404).send();
};

export default router;
