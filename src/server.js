import express from "express";
import morgan from "morgan";
import sesstion from "express-session";
import globalRouter from "./Router/globalRouter";
import mongoStore from "connect-mongo";
import userRouter from "./Router/uesrRouter";
import videoRouter from "./Router/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extend: true }));
app.use(
  sesstion({
    secret: "hello",
    extended: true,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/chansaem-wetube",
    }),
  })
);

app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);
export default app;
 // wkf