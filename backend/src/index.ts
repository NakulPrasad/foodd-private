import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import { apiRouter } from "./Routes/apiRouter.js";
import dbConfig from "./configs/dbConfig2.js";
import passport, { passportRoutes } from "./configs/passportConfig.js";
import corsMiddleware from "./middleware/corsMiddleware.js";
import rateLimiter from "./middleware/rateLimitter.js";

const app = express();

app.use(corsMiddleware);
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
      ttl: 1 * 24 * 60 * 60, // 14 days
    }),
  }),
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
