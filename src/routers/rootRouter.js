import express from "express";
import { home, songClick } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/", songClick);

export default rootRouter;
