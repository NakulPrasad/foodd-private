import cors from "cors";
import isValidOrigin from "../utils/validOrigin.js";
import { FRONTEND_URL, BACKEND_URL } from "../configs/env.js";

const allowedOrigins = [FRONTEND_URL, BACKEND_URL]
console.log(allowedOrigins);


const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true,
});

export default corsMiddleware;
