import {
  addFoodItem,
  deleteFoodItemByName,
  foodTest,
  getAllFoodItems,
} from "../../controllers/foodRouterController/foodRouterController.js";
import authenticateToken from "../../middleware/authMiddleware.js";
import express from "express";

export const foodRouter = express.Router();
foodRouter.use(authenticateToken);
foodRouter.get("/test", foodTest);
foodRouter.get("/getAllFoodItems", getAllFoodItems);
foodRouter.post("/addFoodItem", addFoodItem);
foodRouter.delete("/deleteFoodItemByName", deleteFoodItemByName);
