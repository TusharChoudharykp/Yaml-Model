import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
    },
    (accessToken: string, _refreshToken: string, profile: any, done: any) => {
      return done(null, {
        username: profile.username,
        avatar: profile.photos?.[0]?.value,
        profileUrl: profile.profileUrl,
        accessToken,
      });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));