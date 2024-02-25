import express from "express"
import { getFoodDetails, homeTest } from "../../controllers/homeRouterController/homeRouterController.js"

export const homeRouter = express.Router()

homeRouter.get("/test", homeTest)
homeRouter.get("/getFoodItems", getFoodDetails)