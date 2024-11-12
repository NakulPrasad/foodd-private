import FoodItems from "../../models/foodModel.js";
import { Request, Response } from "express";
import foodService from "../../services/foodService.js";

export const homeTest = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Working" });
};

export const getFoodDetails = async (req: Request, res: Response) => {
  try {
    // const id = "648c815729278cfb1dbce239";
    const id = req.query.id;
    const food = await FoodItems.findById(id);
    if (food) return res.status(200).json({ data: food });
    return res.status(500).json({ message: "Food Added Successfully" });
  } catch (error: any) {
    console.error(error);
    return res.send({ message: "Server error", err: error.message });
  }
};

export const addFoodItem = async (req: Request, res: Response) => {
  try {
    const food = req.body;
    const foodAdded = await FoodItems.create(food);
    if (foodAdded)
      return res
        .status(200)
        .json({ message: "Food Added Sucessfully", data: foodAdded });
    return res.status(500).json({ message: "Can't Add Food" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Can't add Food", err: error.message });
  }
};

export const getAllFoodItems = async (req: Request, res: Response) => {
  try {
    const FoodService = foodService.getInstance();
    const foodItems = await FoodService.getAllFoodItems();
    return res
      .status(200)
      .json({
        message: "All Food items fetched successfully",
        data: foodItems,
      });
  } catch (error: any) {
    console.error("Error fetching food items:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error occurred. Please try again later.",
    });
  }
};
