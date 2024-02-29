import express from "express"
import { createUser, getMyDetails, getOrderDetails } from "../../controllers/userRouterController/userRouterController.js"

export const userRouter = express.Router()
userRouter.post("/createUser", createUser)
userRouter.get("/my", getMyDetails)
userRouter.get("/getOrderData", getOrderDetails)