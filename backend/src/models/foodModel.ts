import { Schema, model } from "mongoose";

const foodItemSchema = new Schema({
  name: String,
  CategoryName: String,
  img: String,
  options: [
    {
      size: String,
      price: Number,
    },
  ],
  description: String,
});

export interface foodItem {
  name: String;
  CategoryName: String;
  img: String;
  options: [
    {
      size: String;
      price: Number;
    }
  ];
  description: String;
}

const foodItemModel = model<foodItem>("foodItems", foodItemSchema);
export default foodItemModel;
