import express from "express";
import { homeRouter } from "./homeRouter/homeRouter.js";
import { userRouter } from "./userRouter/userRouter.js";
import { orderRouter } from "./orderRouter/orderRouter.js";
import authenticateToken from "../middleware/authMiddleware.js";

export const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/home", homeRouter);
apiRouter.use("/order", orderRouter);
