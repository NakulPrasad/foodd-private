import foodService from "../../services/foodService.js";
import { Request, Response } from "express";
import FoodItem from "../../models/foodModel.js";

const FoodService = foodService.getInstance();

export const foodTest = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Working Food Path" });
};

export const getAllFoodItems = async (req: Request, res: Response) => {
  const food: Response = await FoodService.getAllFoodItems(res);
  return food;
};

export const addFoodItem = async (req: Request, res: Response) => {
  const food = req.body;
  const foodAdded: Response = await FoodService.addFoodItem(food, res);
  return foodAdded;
};

export const deleteFoodItemByName = async (req: Request, res: Response) => {
  const foodName: string = req.body.name;
  const foodDelete: Response = await FoodService.deleteFoodItemByName(
    foodName,
    res
  );
  return foodDelete;
};
