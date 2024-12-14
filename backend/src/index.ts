import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import path, { join } from "path";
import { apiRouter } from "./Routes/apiRouter.js";
import dbConfig from "./configs/dbConfig2.js";
import rateLimiter from "./middleware/rateLimitter.js";
import passport, { passportRoutes } from "./configs/passportConfig.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import corsMiddleware from "./middleware/corsMiddleware.js";

const app = express();

app.use(corsMiddleware);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


app.use(express.json());
app.use(morgan("dev"));

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

app.use("/apiv1", apiRouter);

// Connecting frontend
// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(path.resolve(), "../frontend/dist"), {
      setHeaders: (res, path) => {
        if (path.endsWith(".css")) {
          res.set("Content-Type", "text/css");
        } else if (path.endsWith(".js")) {
          res.set("Content-Type", "application/javascript");
        } else if (path.endsWith(".html")) {
          res.set("Content-Type", "text/html");
        }
      },
    })
  );
  app.get("*", function (req, res) {
    res.sendFile(
      path.join(path.resolve(), "../frontend/dist/index.html"),
      function (err) {
        res.status(500).send(err);
      }
    );
  });
}

app.get("/", (req, res) => {
  res.send("FOOD-MERN BACKEND WORKING FINE");
});

// passportRoutes(app);
// app.use(rateLimiter);

export default app;
