//order data stores in db for that particular user
// we have to make schema using mongoose.
//after creating schema, we have to make a endpoint
//make new file : OrderData.js in Routes.
const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },
    img: {
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model('order', OrderSchema)