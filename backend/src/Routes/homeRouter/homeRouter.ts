import express from "express";
import {
  getAllFoodItems,
  getFoodDetails,
  homeTest,
} from "../../controllers/homeRouterController/homeRouterController.js";

export const homeRouter = express.Router();

homeRouter.get("/test", homeTest);
homeRouter.get("/getAllFoodItems", getAllFoodItems);
