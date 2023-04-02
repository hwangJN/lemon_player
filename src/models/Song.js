import mongoose from "mongoose";
import { async } from "regenerator-runtime";
const fs = require("fs").promises;

const songSchema = new mongoose.Schema({
  albumTitle: String,
  title: String,
  singer: String,
  albumCover: String,
  source: Buffer,
  meta: {
    play: { type: Number, default: 0, required: true },
    heart: { type: Number, default: 0, required: true },
  },
});

const Song = mongoose.model("Song", songSchema);

const dataFilePath = "src/models/data/Song.json";
async function saveData() {
  try {
    // 데이터 파일 읽어오기
    const data = await fs.readFile(dataFilePath);
    // JSON 파싱
    const song = JSON.parse(data);
    // DB에 데이터 저장
    Song.create(song, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Data inserted successfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
}

//데이터 다 지우기
async function deleteDate() {
  Song.deleteMany({}, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Data cleared successfully!");
    }
  });
}
//deleteDate();

Song.find({}, function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log("song :", data);
  }
});

export default Song;
