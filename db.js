const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(uri);

        // Grab collection and store in fetchData, always after connection established.
        const fetchedData = mongoose.connection.db.collection("foodItems");
        // Using find to search database {empty} means all data
        const foodData = await fetchedData.find({}).toArray();
        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        global.foodItems = foodData;
        global.foodCategory = catData;

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = mongoDB;

