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
import corsMiddleware from "./middleware/corsMiddleware.js";

const app = express();

app.use(corsMiddleware);
// const logger = (req: Request, res: Response, next: NextFunction) => {
//   log(req);
//   next();
// };

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// app.use(logger);
app.use(express.json());
app.use(morgan("dev"));


app.use(rateLimiter);


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

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.send("FOOD-MERN BACKEND WORKING FINE");
});

app.use("/apiv1", apiRouter);

passportRoutes(app);

export default app;
