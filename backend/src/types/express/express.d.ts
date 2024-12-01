import * as express from "express";
import { User } from "./user.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
