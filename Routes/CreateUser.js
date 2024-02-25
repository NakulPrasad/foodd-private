import { Router } from 'express';
const router = Router();
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';
import { genSalt, hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
const { sign } = pkg;




export default router;