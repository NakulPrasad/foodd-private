import { Response } from "express";
import FoodCategory, { foodCategoryInterface } from "../models/foodCategory.js";
import FoodItem, { foodItemInterface } from "../models/foodModel.js";

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
    res: Response,
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

  async getAllFoodCategory(res: Response): Promise<Response> {
    const foodCategories = await FoodCategory.find({});
    if (!foodCategories) {
      return res.status(400).json({ messsage: "Cant get food Categories" });
    }
    return res
      .status(200)
      .json({ message: "getAllFoodCategory Success", data: foodCategories });
  }

  async addFoodCategory(
    food: foodCategoryInterface,
    res: Response,
  ): Promise<Response> {
    try {
      const foodCategoryAdded = await FoodCategory.create(food);
      if (!foodCategoryAdded) {
        return res.status(500).json({
          message: "Failed to add FoodCategory, invalid food category",
        });
      }
      return res
        .status(200)
        .json({ message: "Food Category Added Successfully" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Failed To add FoodCategory", error: error.message });
    }
  }
}
