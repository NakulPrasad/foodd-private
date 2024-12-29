import express from "express";
import {
  addFoodCategory,
  addFoodItem,
  deleteFoodItemByName,
  foodTest,
  getAllFoodCategory,
  getAllFoodItems,
} from "../../controllers/foodRouterController/foodRouterController.js";
import authenticateToken from "../../middleware/authMiddleware.js";

export const foodRouter = express.Router();
foodRouter.use(authenticateToken);
foodRouter.get("/test", foodTest);
foodRouter.get("/getAllFoodItems", getAllFoodItems);
foodRouter.get("/getAllFoodCategory", getAllFoodCategory);
foodRouter.post("/addFoodItem", addFoodItem);
foodRouter.post("/addFoodCategory", addFoodCategory);
foodRouter.delete("/deleteFoodItemByName", deleteFoodItemByName);
