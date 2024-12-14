// var GoogleStrategy = require('passport-google-oauth20').Strategy;
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  USER_SERVICE_URL,
} from "./server-config";
import { generateToken } from "@/utils/tokens";
import axios from "axios";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const body = {
          name: profile._json.name!,
          email: profile._json.email!,
          avatar: profile._json.picture,
          username: profile._json.email!,
        };

        const response = await axios.post(
          `${USER_SERVICE_URL}/api/auth/oauth`,
          body,
        );
        const data = response.data.data;

        return cb(null, data);
      } catch (error) {
        return cb(error);
      }
    },
  ),
);
