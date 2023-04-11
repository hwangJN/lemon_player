export const localsMiddleware = (req, res, next) => {
  console.log("middleware!");
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "LEMON";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
