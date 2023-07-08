const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const uri = "mongodb+srv://nakul:qwerty123@foodd.5qdwl8g.mongodb.net/Foodd?retryWrites=true&w=majority";
//we have to this in index.js (express)
//make function and export
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


        // console.log(global.foodItems);


    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = mongoDB;

