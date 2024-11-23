import express from "express";
import cors from "cors";
import morgan from "morgan";
import { join } from "path";
import { apiRouter } from "./Routes/apiRouter.js";
import { log } from "console";
import dbConfig from "./configs/dbConfig2.js";
import rateLimiter from "./middleware/rateLimitter.js";
import passport, { passportRoutes } from "./configs/passportConfig.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

/**
 * @description Function to check if the origin contains 'foodd-mern'
 * @param origin : string
 * @returns boolean
 */

function isValidOrigin(origin: string) {
  if (process.env.NODE_ENV === "production") {
    return origin && /https?:\/\/.*foodd-mern.*/.test(origin);
  }
  return origin && /https?:\/\/.*localhost.*/.test(origin);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (isValidOrigin(origin)) {
        return callback(null, true); // Allow the request if the origin contains 'foodd-mern'
      } else {
        const message =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(message), false); // Deny the request if the origin does not contain 'foodd-mern'
      }
    },
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimiter);
// app.use(cookieParser())

/**
 * Connect to database
 */
const dbconfig = new dbConfig();
dbconfig.connect();

app.use("/apiv1", apiRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(process.cwd() + "../frontend/dist"));

  app.get("*", function (req, res) {
    res.sendFile(process.cwd() + "/frontend/dist/index.html", function (err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

app.get("/", (req, res) => {
  res.send("FOOD-MERN BACKEND WORKING FINE");
});

passportRoutes(app);

app.listen(PORT, () => {
  console.log(`NODE Server is running at ${PORT}`);
});
