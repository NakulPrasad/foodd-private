import express from "express";
import { homeRouter } from "./Routes/homeRouter/homeRouter.js";
import { userRouter } from "./Routes/userRouter/userRouter.js";

export const apiRouter = express.Router();

apiRouter.use("/user",userRouter);
apiRouter.use("/home",homeRouter);
// app.use('/api', createUserRouter);
// app.use('/api', displayDataRouter);
// app.use("/api", orderDataRouter);