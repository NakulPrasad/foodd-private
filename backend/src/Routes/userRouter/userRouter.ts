import express from "express";
import {
  addUser,
  getMyDetails,
  getUserById,
  loginUser,
  removeUser,
} from "../../controllers/userRouterController/userRouterController.js";

export const userRouter = express.Router();
userRouter.post("/addUser", addUser);
userRouter.delete("/removeUser", removeUser);
userRouter.get("/my", getMyDetails);
userRouter.post("/login", loginUser);
userRouter.get("/getUser", getUserById);
