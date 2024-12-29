import { Request, Response } from "express";
import foodService from "../../services/foodService.js";

const FoodService = foodService.getInstance();

export const foodTest = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Working Food Path" });
};

export const getAllFoodItems = async (req: Request, res: Response) => {
  const response: Response = await FoodService.getAllFoodItems(res);
  return response;
};

export const getAllFoodCategory = async (req: Request, res: Response) => {
  const response: Response = await FoodService.getAllFoodCategory(res);
  return response;
};

export const addFoodCategory = async (req: Request, res: Response) => {
  const foodCategory = req.body;
  const response: Response = await FoodService.addFoodCategory(
    foodCategory,
    res,
  );
  return response;
};

export const addFoodItem = async (req: Request, res: Response) => {
  const response = req.body;
  const foodAdded: Response = await FoodService.addFoodItem(response, res);
  return foodAdded;
};

export const deleteFoodItemByName = async (req: Request, res: Response) => {
  const foodName: string = req.body.name;
  const foodDelete: Response = await FoodService.deleteFoodItemByName(
    foodName,
    res,
  );
  return foodDelete;
};
