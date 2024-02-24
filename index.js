import express, { json } from 'express';
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import { join } from 'path';
import mongoDB from "./db.js";
import createUserRouter from "./Routes/CreateUser.js";
import displayDataRouter from "./Routes/DisplayData.js";
import orderDataRouter from "./Routes/OrderData.js";

const PORT = process.env.PORT || 80;

config();
const app = express();
app.use(json());
app.use(morgan("common"));
app.use(cors());

const connectToMongoDB = async () => {
  try {
    await mongoDB();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToMongoDB();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(join(__dirname, './client/build')));

//   app.get('*', function (req, res) {
//     res.sendFile(join(__dirname, "./client/build/index.html"), function (err) {
//       res.status(500).send(err);
//     })
//   })
// }

app.get('/', (req, res) => {
  res.send('BACKEND WORKING FINE')
})

app.use('/api', createUserRouter);
app.use('/api', displayDataRouter);
app.use("/api", orderDataRouter);
