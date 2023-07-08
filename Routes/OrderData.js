const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')

//we have to create a route, copy paste form DispalyData.js
//upon clicking checkout, user.email + data=usecart() {cart.js} (all data in state)
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date })

    //if email not exists in db: first order (create) then append new order to db
    let eId = await Order.findOne({ 'email': req.body.email })
    // console.log(eId);
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ sucess: true })
            })
        } catch (error) {
            console.error(error.message);
            res.send("Server error", error.message);
        }

    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ sucess: true })
                })

        } catch (error) {
            res.send("Server error", error.message);
        }
    }

})
//endpoint for order history
router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: myData });

    } catch (error) {
        res.send("Server error", error.message);
    }


})

module.exports = router;