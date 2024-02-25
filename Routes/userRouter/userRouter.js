import express from "express"
import { getMyDetails } from "../../controllers/userRouterController/userRouterController.js"

export const userRouter = express.Router()
userRouter.get("/my",getMyDetails)