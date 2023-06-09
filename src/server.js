import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";

import rootRouter from "./routers/rootRouter";
import chartRouter from "./routers/chartRouter";
import "./models/Song.js";
const cors = require("cors");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();

let corsOptions = {
  origin: "https://lemon-player.fly.dev",
  credentials: true,
};

app.use(cors(corsOptions));

const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    // cookie: {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // },
  })
);
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/public", express.static("src"));
//app.use(favicon(path.join(__dirname, "favicon.ico")));
//app.use(favicon(path.join(__dirname, "favicon-32x32.png")));
app.use("/", rootRouter);
app.use("/chart", chartRouter);

export default app;
