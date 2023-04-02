import express from "express";
import Song from "../models/Song";

const chart = async (req, res) => {
  try {
    const songs = await Song.find({});
    return res.render("chart", { pageTitle: "CHART" });
  } catch {
    return res.render("server-error", error);
  }
};
const chartRouter = express.Router();
chartRouter.get("/", chart);

export default chartRouter;
