import { async } from "regenerator-runtime";
import User from "../models/User";
const bcrypt = require("bcrypt");

export const login = async (req, res) => {
  try {
    return res.render("login", { pageTitle: "LOGIN" });
  } catch (error) {
    return res.render("server-error");
  }
};

//로그인
export const postLogin = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "LOGIN",
      errorMessage: "등록된 회원 정보가 없습니다",
    });
  }
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "LOGIN",
      errorMessage: "잘못된 비밀번호 입니다.",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
//로그아웃
export const postLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

//회원가입
export const SignupPage = (req, res) => {
  try {
    return res.render("signup", { pageTitle: "SIGNUP" });
  } catch (error) {
    return res.render("server-error");
  }
};

export const postRegister = async (req, res) => {
  const { id, password, NickName } = req.body;
  const myPL = [];
  const myHT = [];
  const existingUser = await User.findOne({ id });
  if (existingUser) {
    return res.status(400).render("signup", {
      pageTitle: "SIGNUP",
      errorMessage: "이미 사용중인 아이디입니다",
    });
  } else if (id.length < 5) {
    return res.status(400).render("signup", {
      pageTitle: "SIGNUP",
      errorMessage: "아이디는 5자 이상 작성해주세요",
    });
  } else if (password.length < 6) {
    return res.status(400).render("signup", {
      pageTitle: "SIGNUP",
      errorMessage: "비밀번호는 6자 이상 작성해주세요",
    });
  } else if (NickName.length < 2) {
    return res.status(400).render("signup", {
      pageTitle: "SIGNUP",
      errorMessage: "닉네임은 2자 이상 작성해주세요",
    });
  }
  // 사용자 저장
  const user = new User({
    id,
    password,
    username: NickName,
    myPL,
    myHT,
    profile: "profile.jpg",
  });
  req.session.loggedIn = true;
  req.session.user = user;
  try {
    await user.save();
    return res.redirect("/");
  } catch (err) {
    return res
      .status(400)
      .json({ message: "회원가입 중 오류가 발생하였습니다." });
  }
};

export const getMypage = async (req, res) => {
  try {
    if (req.session.loggedIn) {
      return res.render("mypage", {
        pageTitle: "MyPage",
        user: req.session.user,
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    return res.render("server-error");
  }
};

export const EditMyInfo = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findById(req.session.user._id);
    user.username = username;
    if (req.file) {
      user.profile = req.file.filename;
    }
    await user.save();
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
