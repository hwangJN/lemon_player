import mongoose from "mongoose";
const fs = require("fs").promises;
console.log("!!");
const MVSchema = new mongoose.Schema({
  id: String,
});

const MusicVideo = mongoose.model("MV", MVSchema);

const dataFilePath = "src/models/data/MV.json";
async function saveData() {
  try {
    const data = await fs.readFile(dataFilePath);
    const mv = JSON.parse(data);
    MusicVideo.create(mv, function (err) {
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
  MusicVideo.deleteMany({}, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Data cleared successfully!");
    }
  });
}
//deleteDate();

MusicVideo.find({}, function (err, data) {
  if (err) {
    console.error(err);
  } else {
    //console.log("mv :", data.slice(0, 2));
  }
});

export default MusicVideo;
