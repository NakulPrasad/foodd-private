import express from "express"
import { orderTest } from "../../controllers/orderRouterController/orderRouterController.js"

export const orderRouter = express.Router()
orderRouter.post("/test",orderTest)
// orderRouter.get("/getOrderData", getOrderDetails)