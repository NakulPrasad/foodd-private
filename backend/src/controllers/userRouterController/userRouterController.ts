import User, { userInterface } from "../../models/userModel.js";
import { check, validationResult } from "express-validator";
import bcrypt, { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userService from "../../services/userService.js";
import { log } from "console";

const jwtKey = process.env.SECRET_JWT;
const UserService = userService.getInstance();

export const getMyDetails = async (req: Request, res: Response) => {
  try {
    const id = req.body;
    const user = await User.find({ name: "Eklavya" });
    if (!user) return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ message: "found", success: true, data: user });
  } catch (err) {
    return res.status(500).json({ message: "Invalid Request" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id: string | null =
      typeof req.query.id === "string" ? req.query.id : null;

    // log(id);
    if (!id) {
      return res.status(400).json({ message: "Invalid UserId" });
    }
    const user: userInterface | null = await UserService.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User Found", data: user });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Invalid Request", Error: error.message });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
    };
    const existingUser: userInterface | null = await User.findOne({
      email: newUser.email,
    });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "User Already Exists With Given Email" });
    }
    const user = await UserService.registerUser(newUser);
    if (!user) {
      return res.status(500).json({ message: "Can't Register User" });
    }
    return res.status(200).json({ message: "User Added Successfull" });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error Occured During User Registration",
      Error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate email and password
    await Promise.all([
      check("email").isEmail().withMessage("Invalid email format").run(req),
      check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const userData = await User.findOne({ email });
    if (!userData) {
      console.log("NO User");
      return res
        .status(400)
        .json({ errors: "Try Again!! Invalid user or password" });
    }

    // Compare passwords
    const pwdCompare = await bcrypt.compare(password, userData.password);
    if (!pwdCompare) {
      console.log("Pass mismaatch");
      return res
        .status(400)
        .json({ errors: "Try Again!! Invalid user or password" });
    }

    // Sign JWT token
    const authToken = jwt.sign({ id: userData.id }, jwtKey);

    return res.json({ success: true, authToken });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Invalid Request", err: error.message });
  }
};
