import { log } from "console";
import foodCategoryModel, { foodCategory } from "../models/foodCategory.js";
import foodItemModel, { foodItem } from "../models/foodModel.js";

export default class foodService {
  private static instance: foodService;

  private constructor() {}
  async getAllFoodItems(): Promise<foodItem[]> {
    const foodItems = await foodItemModel.find({});
    // log(foodItems);
    return foodItems;
  }
  async getAllFoodCategory(): Promise<foodCategory[]> {
    return await foodCategoryModel.find();
  }

  public static getInstance(): foodService {
    if (!foodService.instance) {
      foodService.instance = new foodService();
    }
    return foodService.instance;
  }
}
