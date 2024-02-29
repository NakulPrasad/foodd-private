export const orderTest = (req,res)=>{
    return res.status(200).json({status:"Sucess", message:"Working"})
}

export const orderData = async (req, res)=>{
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date })

    let eId = await findOne({ 'email': req.body.email })
    // console.log(eId);
    if (eId === null) {
        try {
            await create({
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
            await findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ sucess: true })
                })

        } catch (error) {
            res.send("Server error", error.message);
        }
    }
}

export const myOrderData = async (req,res)=>{
    try {
        let myData = await findOne({ 'email': req.body.email });
        res.json({ orderData: myData });

    } catch (error) {
        res.send("Server error", error.message);
    }
}