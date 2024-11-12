import mongoose, { Schema, Document } from "mongoose";

const foodCategorySchema = new Schema({
  CategoryName: String,
});

export interface foodCategory extends Document {
  CategoryName: String;
}

const foodCategoryModel = mongoose.model<foodCategory>(
  "foodCategory",
  foodCategorySchema
);

export default foodCategoryModel;
