const mongoose = require('mongoose')

const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})
//model is wrapper helps is inserting data
module.exports = mongoose.model('user', UserSchema)