import mongoose from "mongoose";
import { Schema, Model } from "mongoose";

const foodItemsSchema = new Schema({
_id : mongoose.Schema.Types.ObjectId,
name: String,
CategoryName : String,
img:String,
options: [{
    size : String,
    price : Number
}],
description : String,
})

const foodItems = Model('FoodItem',foodItemsSchema);
export default foodItems;

