import express from "express";
import { home, songClick } from "../controllers/songController";
import { login, postLogin, postLogout } from "../controllers/loginController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/", songClick);
rootRouter.get("/login", login);
rootRouter.post("/login", postLogin);
rootRouter.post("/logout", postLogout);

export default rootRouter;
