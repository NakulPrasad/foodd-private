import { Request, Response } from "express";
import Order from "../../models/orderModel.js";

export const orderTest = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Working Order Router" });
};

export const orderCheckout = async (req: Request, res: Response) => {
  const data = req.body.order_data;
  // const { email } = req.user!;
  const email = (req.user as any).email;

  await data.splice(0, 0, { Order_date: req.body.order_date });

  const user = await Order.findOne({ email: email });

  if (!user) {
    try {
      const order = await Order.create({
        email: email,
        order_data: [data],
      });
      if (!order) {
        return res.status(204).json({ message: "Order Can't be added" });
      }
      return res.status(201).json({ message: "Order Successfully added" });
    } catch (error: any) {
      console.error(error.message);

      return res
        .status(500)
        .json({ message: "Can't Place order", error: error.message });
    }
  }
  const order = await Order.findOneAndUpdate(
    { email: email },
    { $push: { order_data: data } },
  );
  if (!order) {
    return res.status(204).json({ message: "Order Can't be added" });
  }
  return res.status(201).json({ message: "Order Successfully added" });
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const email = (req.user as any).email;
    if (!email) {
      return res.status(404).json({ error: "User not found" });
    }
    const orders = await Order.findOne({ email: email });
    return res.status(200).json({ orderData: orders });
  } catch (error: any) {
    return res.send("Server error");
  }
};
