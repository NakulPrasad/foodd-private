import express from 'express';
import * as dotenv from 'dotenv';
import cors from "cors";
import morgan from "morgan";
import { join } from 'path';
import  {connectToDB} from "./db.js";

import { apiRouter } from './server.js';

dotenv.config();

const PORT = process.env.PORT || 80;


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(cookieParser())


connectToDB()

app.use('/api',apiRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(process.cwd() + '../frontend/dist'));

//   app.get('*', function (req, res) {
//     res.sendFile(process.cwd() + "/frontend/dist/index.html", function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     });
//   });
// }


app.get('/', (req, res) => {
  res.send('BACKEND WORKING FINE')
});


app.listen(PORT,()=>{
  console.log(`Server is running at ${PORT}`)
})