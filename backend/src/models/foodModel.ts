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

export interface foodItemInterface {
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

const foodItemModel = model<foodItemInterface>("foodItems", foodItemSchema);
export default foodItemModel;
