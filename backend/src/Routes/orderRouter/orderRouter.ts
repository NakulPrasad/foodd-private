import express from "express";
import {
  getMyOrders,
  orderCheckout,
  orderTest,
} from "../../controllers/orderRouterController/orderRouterController.js";

import authenticateToken from "../../middleware/authMiddleware.js";
export const orderRouter = express.Router();
orderRouter.use(authenticateToken);
orderRouter.post("/test", orderTest);
orderRouter.post("/getMyOrders", getMyOrders);
orderRouter.post("/orderCheckout", orderCheckout);
