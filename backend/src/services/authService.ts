import { Response } from "express";
import bcrypt, { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { checkSchema, validationResult } from "express-validator";
interface userLogin {
  email: string;
  password: string;
}

class authService {
  private static jwtKey = process.env.SECRET_JWT;
  private static instance: authService;
  public static getInstance(): authService {
    if (!authService.instance) {
      authService.instance = new authService();
    }
    return authService.instance;
  }

  async validateUser(user: userLogin): Promise<boolean> {
    const userValidationSchema = checkSchema({
      email: {
        isEmail: {
          errorMessage: "Invalid email",
        },
      },
      password: {
        isStrongPassword: {
          options: {
            minLength: 8,
          },
          errorMessage:
            "Invalid Password : Password must be at least 8 characters",
        },
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
      console.error("Validation errors:", errors.array());
      return false;
    }

    // If validation passes
    return true;
  }

  async login(user: userLogin, res: Response): Promise<Response> {
    const isValid = await this.validateUser(user);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const { email, password } = user;
    const userData = await User.findOne({ email });
    if (!userData) {
      console.error("No user found with provided email");
      return res
        .status(400)
        .json({ errors: "Try Again!! Invalid user or password" });
    }

    // Compare passwords
    const pwdCompare = await bcrypt.compare(password, userData.password);
    if (!pwdCompare) {
      console.log("Wrong Password");
      return res
        .status(400)
        .json({ errors: "Try Again!! Invalid user or password" });
    }
    // Sign JWT token
    const authToken = jwt.sign({ id: userData.id }, authService.jwtKey);
    return res.json({ authToken: authToken });
  }
}

export default authService;
