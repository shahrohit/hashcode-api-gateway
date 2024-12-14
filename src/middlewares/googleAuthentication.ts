import passport from "passport";

const googleAuth = passport.authenticate("google", {
  session: false,
  scope: ["profile", "email"],
});
const googleAuthCallback = passport.authenticate("google", {
  session: false,
  failureRedirect: "http://localhost:3000/sign-in",
});

export { googleAuth, googleAuthCallback };
