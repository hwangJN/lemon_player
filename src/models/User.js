import mongoose from "mongoose";
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const userSchema = new mongoose.Schema({
  id: "string",
  password: "string",
  username: "string",
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
    User.create(user, function (err) {
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
  User.deleteMany({}, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Data cleared successfully!");
    }
  });
}
//deleteDate();

User.find({}, function (err, data) {
  if (err) {
    console.error(err);
  } else {
    //console.log("user :", data);
  }
});
//const user = User.find();
//console.log(user);

export default User;
