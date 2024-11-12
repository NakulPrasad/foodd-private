import { Request, Response } from "express";

class orderService {
  private static instance: orderService;
  private constructor() {}

  public static getInstance(): orderService {
    if (!orderService.instance) {
      orderService.instance = new orderService();
    }
    return orderService.instance;
  }

  public getOrderDetails = async (req: Request, res: Response) => {
    try {
      return res.json({ message: "working" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Cant getOrder Details", err: error.message });
    }
  };

  public addOrder = async () => {};
}
export default orderService;
