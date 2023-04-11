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
export const postRegister = (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};
