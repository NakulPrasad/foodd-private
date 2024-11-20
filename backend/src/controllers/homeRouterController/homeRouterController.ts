import FoodItems from "../../models/foodModel.js";
import { Request, Response } from "express";
import foodService from "../../services/foodService.js";

export const homeTest = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Working" });
};
