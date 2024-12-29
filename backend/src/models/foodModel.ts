import { Schema, model } from "mongoose";

const foodItemSchema = new Schema({
  CategoryName: String,
  name: String,
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
  CategoryName: String;
  name: String;
  img: String;
  options: [
    {
      size: String;
      price: Number;
    },
  ];
  description: String;
}

export default model("foodItems", foodItemSchema);
