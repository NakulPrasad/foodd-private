import express from "express";
import {
  addUser,
  getMyDetails,
  getUserById,
  loginUser,
} from "../../controllers/userRouterController/userRouterController.js";

export const userRouter = express.Router();
userRouter.post("/addUser", addUser);
userRouter.get("/my", getMyDetails);
userRouter.post("/login", loginUser);
userRouter.get("/getUser", getUserById);
