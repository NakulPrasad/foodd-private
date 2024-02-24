import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(uri);
        const fetchedData = connection.db.collection("foodItems");
        const foodData = await fetchedData.find({}).toArray();
        const foodCategory = connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        global.foodItems = foodData;
        global.foodCategory = catData;

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default mongoDB;

