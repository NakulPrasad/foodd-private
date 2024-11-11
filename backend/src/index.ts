import express from "express";
import cors from "cors";
import morgan from "morgan";
import { join } from "path";
import { connectToDB } from "./db.js";
import { apiRouter } from "./server.js";
import { log } from "console";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
// Function to check if the origin contains 'foodd-mern'
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
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false); // Deny the request if the origin does not contain 'foodd-mern'
      }
    },
  })
);
app.use(express.json());
app.use(morgan("dev"));
// app.use(cookieParser())

connectToDB();

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
  res.send("BACKEND WORKING FINE");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
