import express, { NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { join } from "path";
import { apiRouter } from "./Routes/apiRouter.js";
import { log } from "console";
import dbConfig from "./configs/dbConfig2.js";
import rateLimiter from "./middleware/rateLimitter.js";
import passport, { passportRoutes } from "./configs/passportConfig.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const PORT = process.env.PORT || 3000;

const app = express();

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
      if (!origin) return callback(null, true);
      if (isValidOrigin(origin)) {
        return callback(null, true); // Allow the request if the origin contains 'foodd-mern'
      } else {
        const message =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(message), false); // Deny the request if the origin does not contain 'foodd-mern'
      }
    },
    credentials: true,
  })
);
const logger = (req: Request, res: Response, next: NextFunction) => {
  log(req);
  next();
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// app.use(logger);
app.use(express.json());
app.use(morgan("dev"));

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", true);
}

app.use(rateLimiter);
// app.use(cookieParser())

// Setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret2024",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_URI,
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

/**
 * Connect to database
 */
const dbconfig = new dbConfig();
dbconfig.connect();

app.use("/apiv1", apiRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(process.cwd() + "../../frontend/dist")); //this is relative to /dist/index.js

//   app.get("*", function (req, res) {
//     if (!req.url.startsWith("/assets")) {
//       res.sendFile(
//         process.cwd() + "../../frontend/dist/index.html",
//         function (err) {
//           if (err) {
//             res.status(500).send(err);
//           }
//         }
//       );
//     }
//   });
// }

app.get("/", (req, res) => {
  res.send("FOOD-MERN BACKEND WORKING FINE");
});

passportRoutes(app);

app.listen(PORT, () => {
  console.log(`NODE Server is running at ${PORT}`);
});
