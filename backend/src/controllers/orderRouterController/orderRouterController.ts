import Order from "../../models/orderModel.js";
import User from "../../models/userModel.js";
import { Request, Response } from "express";

export const orderTest = (req: Request, res: Response) => {
  return res.status(200).json({ status: "Sucess", message: "Working" });
};

export const orderCheckout = async (req: Request, res: Response) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  let eId = await User.findOne({ email: req.body.email });
  // console.log(eId);
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        return res.json({ sucess: true });
      });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ msg: "Internal Server error", error: err.message });
    }
  } else {
    try {
      await User.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        return res.json({ sucess: true });
      });
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "Internal Server error", error: err.message });
    }
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    return res.json({ orderData: myData });
  } catch (error: any) {
    return res.send("Server error", error.message);
  }
};
