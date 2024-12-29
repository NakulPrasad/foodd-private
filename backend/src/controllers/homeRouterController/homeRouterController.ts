import { Request, Response } from "express";

export const homeTest = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Working" });
};
