import { log } from "console";
import foodCategory, { foodCategoryInterface } from "../models/foodCategory.js";
import FoodItem, { foodItemInterface } from "../models/foodModel.js";
import { Request, Response } from "express";

/**
 * @description This class manages all the operations related to food data.
 */
export default class foodService {
  private static instance: foodService;

  private constructor() {}

  /**
   * @description get single instance of foodService.
   * @returns instance of foodService
   */

  public static getInstance(): foodService {
    if (!foodService.instance) {
      foodService.instance = new foodService();
    }
    return foodService.instance;
  }

  /**
   * @description fetches all the food items
   * @returns foodItemInterface []
   */

  async getAllFoodItems(res: Response): Promise<Response> {
    try {
      const foodItems = await FoodItem.find({});
      if (!foodItems || foodItems.length === 0) {
        throw new Error("No Food Items");
      }
      return res.status(200).json({ data: foodItems });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Failed To get All FoodItem", error: error.message });
    }
  }

  /**
   * @description delete a foodItem
   * @returns foodItemInterface []
   */

  async deleteFoodItemByName(
    foodName: string,
    res: Response
  ): Promise<Response> {
    try {
      const foodItems = await FoodItem.findOneAndDelete({ name: foodName });
      if (!foodItems) {
        throw new Error("Failed to delete food Item");
      }
      return res.status(200).json({ message: "FoodItem deleted sucessfully" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Failed To delete foodItem", error: error.message });
    }
  }

  /**
   * @description add foodItem
   * @returns
   */

  async addFoodItem(food: foodItemInterface, res: Response): Promise<Response> {
    try {
      const foodAdded = await FoodItem.create(food);
      if (!foodAdded) {
        return res
          .status(500)
          .json({ message: "Failed to add FoodItem, invalid food inputs" });
      }
      return res.status(200).json({ message: "Food Added Successfully" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Failed To add FoodItem", error: error.message });
    }
  }

  /**
   * Food Category
   */

  /**
   * @description fetches all the food item category
   * @returns foodCategoryInterface[]
   */

  async getAllFoodCategory(): Promise<foodCategoryInterface[]> {
    return await foodCategory.find({});
  }
}
