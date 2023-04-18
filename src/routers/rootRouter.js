import express from "express";
import {
  getData,
  home,
  songClick,
  songDelete,
  songHeart,
} from "../controllers/songController";
import {
  EditMyInfo,
  SignupPage,
  getMypage,
  login,
  postLogin,
  postLogout,
  postRegister,
} from "../controllers/loginController";

const multer = require("multer");
const path = require("path");
// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const filename = `${req.session.user._id}-${Date.now()}${extension}`;
    cb(null, filename);
  },
});
//var upload = multer({ dest: "public/client/scss/img/Profile/" });
const upload = multer({ storage: storage });
console.log(upload);
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/data", getData);
rootRouter.post("/", songClick);
rootRouter.post("/delete", songDelete);
rootRouter.post("/heart", songHeart);
rootRouter.get("/login", login);
rootRouter.post("/login", postLogin);
rootRouter.post("/logout", postLogout);
rootRouter.get("/mypage", getMypage);
rootRouter.post("/edit", upload.single("profile"), EditMyInfo);

rootRouter.get("/signup", SignupPage);
rootRouter.post("/register", postRegister);

export default rootRouter;
