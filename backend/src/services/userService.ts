import { check, checkSchema, validationResult } from "express-validator";
import bcrypt, { genSalt, hash } from "bcrypt";
import User, { userInterface } from "../models/userModel.js";
import { Request, Response } from "express";
class userService {
  private static instance: userService;
  private constructor() {}
  public static getInstance(): userService {
    if (!userService.instance) {
      userService.instance = new userService();
    }
    return userService.instance;
  }

  async validateUser(
    user: userInterface,
    res: Response
  ): Promise<Response | boolean> {
    const userValidationSchema = checkSchema({
      name: {
        isString: true,
        trim: true,
        notEmpty: {
          errorMessage: "Name is required",
        },
      },
      email: {
        isEmail: {
          errorMessage: "Invalid email Format",
        },
      },
      password: {
        isStrongPassword: {
          options: {
            minLength: 8,
          },
          errorMessage: "Password must be at least 8 characters",
        },
      },
      location: {
        isString: true,
        errorMessage: "Location should be a string",
      },
    });

    const mockRequest = { body: user };

    // Run validation
    await Promise.all(
      userValidationSchema.map((validation) => validation.run(mockRequest))
    );

    // Collect validation results
    const errors = validationResult(mockRequest);

    // If there are errors, return false and log the errors
    if (!errors.isEmpty()) {
      // console.error("Validation errors:", errors.array());
      return res
        .status(400)
        .json({
          message: "All fields are required",
          "Validation errors": errors.array(),
        });
    }

    // If validation passes
    return true;
  }

  async registerUser(user: userInterface, res: Response): Promise<Response> {
    const isValidUser = await this.validateUser(user, res);
    if (typeof isValidUser !== "boolean") {
      // console.error("Failed to register user, invalid user inputs");
      return isValidUser;
    }
    const salt = await genSalt(10);
    let secPassword = await hash(user.password, salt);
    user.password = secPassword;

    const sucess = await User.create(user);
    if (!sucess) {
      // console.error("Failed to register user, can't update database");
      return res
        .status(500)
        .json({ message: "Failed to register user, invalid user inputs" });
    }
    return res.status(200).json({ message: "User Added Successfull" });
  }

  async getUserById(id: string): Promise<userInterface | null> {
    const user: userInterface | null = await User.findById(id, { password: 0 });
    return user || null;
  }

  async getUserByEmail(email: string): Promise<userInterface | null> {
    const user: userInterface | null = await User.findOne(
      { email: email },
      { password: 0 }
    );
    return user || null;
  }

  async getUserByIdAndUpdate(
    id: string,
    update: userInterface
  ): Promise<boolean> {
    const user: userInterface | null = await User.findByIdAndUpdate(id, update);
    return user ? true : false;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const user = await User.findByIdAndDelete(id);
    return user ? true : false;
  }
}
export default userService;
