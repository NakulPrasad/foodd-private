import express from "express";
import { homeRouter } from "./homeRouter/homeRouter.js";
import { userRouter } from "./userRouter/userRouter.js";
import { orderRouter } from "./orderRouter/orderRouter.js";
import authenticateToken from "../middleware/authMiddleware.js";
import { foodRouter } from "./foodRouter/foodRouter.js";

export const apiRouter = express.Router();

apiRouter.use("/food", foodRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/home", homeRouter);
apiRouter.use("/order", orderRouter);
