import { CLIENT_URL } from "@config/server-config";
import passport from "passport";

const GOOGLE = "google";

const googleAuth = passport.authenticate(GOOGLE, {
  session: false,
  scope: ["profile", "email"],
});

const googleAuthCallback = passport.authenticate(GOOGLE, {
  session: false,
  failureRedirect: `${CLIENT_URL}/sign-in`,
});

export { googleAuth, googleAuthCallback };
