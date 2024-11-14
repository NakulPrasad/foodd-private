import { log } from "console";
import foodCategory, { foodCategoryInterface } from "../models/foodCategory.js";
import foodItem, { foodItemInterface } from "../models/foodModel.js";

/**
 * @description This class manages all the operations related to food data.
 */
export default class foodService {
  private static instance: foodService;

  private constructor() {}

  /**
   * @description fetches all the food items
   * @returns foodItemInterface []
   */
  async getAllFoodItems(): Promise<foodItemInterface[]> {
    const foodItems = await foodItem.find({});
    // log(foodItems);
    return foodItems;
  }
  /**
   * @description fetches all the food item category
   * @returns foodCategoryInterface[]
   */
  async getAllFoodCategory(): Promise<foodCategoryInterface[]> {
    return await foodCategory.find();
  }

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
}
