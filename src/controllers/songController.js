import Song from "../models/Song";
import MusicVideo from "../models/MV";

const { google } = require("googleapis");

// Set up a YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY, // replace with your actual API key
});

export const home = async (req, res) => {
  try {
    const songs = await Song.find({}).limit(6); // 최신 앨범
    const songsTop8 = await Song.find({}).sort({ "meta.play": -1 }).limit(8); // 조회순 top10
    const songsTop10 = await Song.find({}).sort({ "meta.play": -1 }).limit(10); // 조회순 top10

    //뮤직비디오 썸네일+title
    const MVs = await MusicVideo.find({});
    const promises = MVs.map(async (video) => {
      const { data } = await youtube.videos.list({
        part: "snippet",
        id: video.id,
      });
      return {
        title: data.items[0].snippet.title,
        thumbnailUrl: data.items[0].snippet.thumbnails.maxres.url,
        id: video.id,
      };
    });
    const videoData = await Promise.all(promises);
    return res.render("home", {
      pageTitle: "HOME",
      songs,
      songsTop8,
      songsTop10,
      videoData,
      MVs,
    });
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

      (err, music) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal server error");
        } else {
          console.log(music);
        }
      }
    );
    console.log(updatedSong);
    res.json(updatedSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating song" });
  }
};
