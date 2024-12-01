import cors from "cors";
import isValidOrigin from "../utils/validOrigin.js";

const corsMiddleware = () => {
  return cors({
    origin: function (origin, callback) {
      // Allow the request if there's no origin (e.g., same-origin request) or it's valid
      if (!origin || isValidOrigin(origin)) return callback(null, true);
      else {
        const message =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(message), false); // Deny the request if the origin does not contain 'foodd-mern'
      }
    },
    credentials: true,
  });
};

export default corsMiddleware;
