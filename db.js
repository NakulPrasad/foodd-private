import mongoose from "mongoose";
import dotenv from "dotenv"
import DBConfig from "./configs/config.js";
dotenv.config()

export const connectToDB = async () => {
    mongoose.set("strictQuery", true)
    const MONGODB_URI = DBConfig.mongodb_connection_uri

    // Wrap MongoDB connection in a function that returns a Promise
    async function connectMongoDB() {
        return new Promise((resolve, reject) => {
            // Connect to MongoDB using Mongoose
            mongoose
                .connect(MONGODB_URI)
                .then(() => {
                    console.log("MONGODB connected")
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    try {
        Promise.all([connectMongoDB()])
    } catch (error) {
        console.log(error)
    }

    // try {
    //     await mongoose.connect(uri);
    //     // const fetchedData = connection.db.collection("foodItems");
    //     // const foodData = await fetchedData.find({}).toArray();
    //     // const foodCategory = connection.db.collection("foodCategory");
    //     // const catData = await foodCategory.find({}).toArray();

    //     // global.foodItems = foodData;
    //     // global.foodCategory = catData;

    // } catch (error) {
    //     console.error('Error connecting to MongoDB:', error);
    // }
};



