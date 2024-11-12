import { check, validationResult } from "express-validator";
import { Request, Response } from "express";
import bcrypt, { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User, { userInterface } from "../models/userModel.js";
const jwtKey = process.env.SECRET_JWT;

class userService {
  private static instance: userService;
  private constructor() {}
  public static getInstance(): userService {
    if (!userService.instance) {
      userService.instance = new userService();
    }
    return userService.instance;
  }

  async registerUser(user: userInterface): Promise<boolean> {
    //   await Promise.all([
    //     check("name").notEmpty().withMessage("Name is required"),
    //     check("email").isEmail().withMessage("Invalid email format"),
    //     check("password")
    //       .isLength({ min: 6 })
    //       .withMessage("Password must be at least 6 characters"),
    //     check("location").notEmpty().withMessage("Location is required"),
    //   ]);

    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }

    //Hash Password

    return new Promise(async (resolve, reject) => {
      const salt = await genSalt(10);
      let secPassword = await hash(user.password, salt);

      const sucess = await User.create(user);
      if (sucess) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  async getUserById(id: string): Promise<userInterface | null> {
    const user: userInterface | null = await User.findById(id);
    return user || null;
  }
}
export default userService;
