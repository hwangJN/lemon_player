import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const songsTop10 = await Song.find({}).sort({ "meta.play": -1 }).limit(10);
    const songs = await Song.find({});
    return res.render("home", { pageTitle: "HOME", songs, songsTop10 });
  } catch (error) {
    return res.render("server-error");
  }
};
