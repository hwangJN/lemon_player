import mongoose from "mongoose";
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs").promises;
const fs2 = require("fs-extra");
const userSchema = new mongoose.Schema({
  id: String,
  password: String,
  username: String,
  //profile: Buffer,
  profile: {
    type: String,
    default: "profile.jpg",
  },
  myPL: [
    {
      songId: String,
      albumTitle: String,
      title: String,
      singer: String,
      albumCover: String,
      music: String,
      meta: {
        play: { type: Number, default: 0, required: true },
        heart: { type: Number, default: 0, required: true },
      },
    },
  ],
  myHT: [
    {
      songId: String,
      albumTitle: String,
      title: String,
      singer: String,
      albumCover: String,
      music: String,
      meta: {
        play: { type: Number, default: 0, required: true },
        heart: { type: Number, default: 0, required: true },
      },
    },
  ],
});
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

const User = mongoose.model("User", userSchema);

const dataFilePath = "src/models/data/User.json";
async function saveData() {
  try {
    // 데이터 파일 읽어오기
    const data = await fs.readFile(dataFilePath);
    // JSON 파싱
    const user = JSON.parse(data);
    // DB에 데이터 저장
    User.create(user, async function (err) {
      if (err) {
        console.error(err);
      } else {
        // const imagePath = path.join(
        //   __dirname,
        //   "../client/scss/img/profile.jpg"
        // );
        // const imageBuffer = await fs.readFile(imagePath);
        // console.log("imageBuffer:", imageBuffer);
        // user.profile = imageBuffer;
        // console.log("user:", user);
        // user.save();
        console.log("Data inserted successfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
}
//saveData();
//데이터 다 지우기
async function deleteData() {
  User.deleteMany({}, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Data cleared successfully!");
    }
  });
}
//deleteData();

User.find({}, function (err, data) {
  if (err) {
    //console.error(err);
  } else {
    console.log("user : ", data);
  }
});

//const user = User.find();
//console.log(user);

export default User;
