import express from 'express';
import dotenv from "dotenv"
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import { join } from 'path';
import  {connectToDB} from "./db.js";
import createUserRouter from "./Routes/CreateUser.js";
import displayDataRouter from "./Routes/DisplayData.js";
import orderDataRouter from "./Routes/OrderData.js";
import { apiRouter } from './server.js';

const PORT = process.env.PORT || 80;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
// app.use(cookieParser())
// app.use(express.static(path.join(process.cwd(), "frontend/dist")))

connectToDB()

// const connectToMongoDB = async () => {
//   try {
//     await  connectToDB();
//     console.log('Connected to MongoDB');

//     app.listen(PORT, () => {
//       console.log(`Example app listening on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// };

// connectToMongoDB();

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
app.use('/api',apiRouter);

app.listen(PORT,()=>{
  console.log(`Server is running at ${PORT}`)
})