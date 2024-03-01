import express from "express"
import { createUser, getMyDetails, getOrderDetails, loginUser } from "../../controllers/userRouterController/userRouterController.js"

export const userRouter = express.Router()
userRouter.post("/createUser", createUser);
userRouter.get("/my", getMyDetails);
userRouter.get("/getOrderData", getOrderDetails);
userRouter.post("/login",loginUser);