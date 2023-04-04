import { async } from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const songs = await Song.find({}).limit(8); // 최신 앨범
    const songsTop10 = await Song.find({}).sort({ "meta.play": -1 }).limit(10); // 조회순 top10
    return res.render("home", { pageTitle: "HOME", songs, songsTop10 });
  } catch (error) {
    return res.render("server-error");
  }
};

export const songClick = async (req, res) => {
  try {
    const songId = req.body.songId;
    //클릭(재생) 수 update
    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      { $inc: { "meta.play": 1 } },
      { new: true }
    );
    res.json(updatedSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating song" });
  }
};
