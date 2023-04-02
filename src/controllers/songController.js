import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const sings = await Song.find({});
    return res.render("home", { pageTitle: "HOME", sings });
  } catch (error) {
    return res.render("server-error");
  }
};
