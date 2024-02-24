const express = require('express')
const app = express()

app.get('/getFood',(req,res) =>{
    try {
        const food = User.get
        return res.status(200).json(data : food);
    } catch (error) {
        console.error(error);
        res.send("Can't Server error");
    }
})

app.post('/foodData', (req, res) => {
    try {
        res.send([global.foodItems, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send("Server error");
    }
})

export default router;