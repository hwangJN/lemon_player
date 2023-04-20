import Song from "../models/Song";
import User from "../models/User";
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
export const getData = async (req, res) => {
  const songs = await Song.find({}).limit(6); // 최신 앨범
  const songsTop8 = await Song.find({}).sort({ "meta.play": -1 }).limit(8); // 조회순 top10
  const songsTop10 = await Song.find({}).sort({ "meta.play": -1 }).limit(10); // 조회순 top10
  const data = {
    songs,
    songsTop8,
    songsTop10,
  };
  if (req.session.loggedIn) {
    //User.findById(req.session.user._id);
    data.myPL = req.session.user.myPL;
    data.myHT = req.session.user.myHT;
  }

  res.json(data); // JSON 형태의 데이터 응답
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
          //console.log(music);
        }
      }
    );
    const song = await Song.findById(songId);

    //클릭하는 곡 나의 플리에 저장
    if (req.session.loggedIn) {
      User.findById(req.session.user._id, (err, user) => {
        if (err) {
          console.log("ERROR!(NOT FIND USER)");
        } else {
          user.myPL.push(song);
          user.save((err) => {
            if (err) {
              console.log("ERROR!(NOT SAVE DATA)");
            } else {
              req.session.user = user;
              req.session.save();
            }
          });
        }
      });
    }

    res.json(updatedSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating song" });
  }
};
export const songHeart = async (req, res) => {
  try {
    const { songID, mode } = req.body;
    //클릭(재생) 수 update
    console.log(mode);
    if (mode === "Delete") {
      //하트 -1
      const updatedSong = await Song.findByIdAndUpdate(
        songID,
        { $inc: { "meta.heart": -1 } },
        (err, music) => {
          if (err) {
            console.log(err);
            res.status(500).send("Internal server error");
          } else {
            //console.log(music);
          }
        }
      );
      //하트 누른 곡 나의 하트리스트에서 삭제
      if (req.session.loggedIn) {
        const user = await User.findById(req.session.user._id);
        const dataIdx = user.myHT.findIndex(
          (data) => data.title == updatedSong.title
        );

        if (dataIdx !== -1) {
          user.myHT.splice(dataIdx, 1); // myHT 배열에서 해당 요소 삭제
          user.save(); // 변경된 데이터를 DB에 저장
          req.session.user = user;
          req.session.save();
        } else {
          res.status(400).send("해당 데이터가 존재하지 않습니다.");
        }
      }

      res.json(updatedSong);
    } else if (mode === "Add") {
      //하트 +1
      const updatedSong = await Song.findByIdAndUpdate(
        songID,
        { $inc: { "meta.heart": 1 } },
        (err, music) => {
          if (err) {
            console.log(err);
            res.status(500).send("Internal server error");
          } else {
            //console.log(music);
          }
        }
      );
      const song = await Song.findById(songID);

      //하트 누른 곡 나의 하트리스트에 저장
      if (req.session.loggedIn) {
        User.findById(req.session.user._id, (err, user) => {
          if (err) {
            console.log("ERROR!(NOT FIND USER)");
          } else {
            user.myHT.push(song);
            user.save((err) => {
              if (err) {
                console.log("ERROR!(NOT SAVE DATA)");
              } else {
                req.session.user = user;
                req.session.save();
              }
            });
          }
        });
      }

      res.json(updatedSong);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating song" });
  }
};
export const songDelete = async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dataId = req.body.songId;
      const user = await User.findById(req.session.user._id);
      const dataIdx = user.myPL.findIndex((data) => data._id == dataId);
      if (dataIdx !== -1) {
        user.myPL.splice(dataIdx, 1); // myPL 배열에서 해당 요소 삭제
        await user.save(); // 변경된 데이터를 DB에 저장
        req.session.user = user;
        req.session.save();
        res.send("데이터 삭제 완료");
      } else {
        res.status(400).send("해당 데이터가 존재하지 않습니다.");
      }
    } else {
      res.send("로그인 해주세요");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating song" });
  }
};
