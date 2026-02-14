const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

/**
 * Store only the MongoDB user id in the session.
 */
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

/**
 * Load user from MongoDB by id.
 */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const githubId = String(profile.id);
        const username = profile.username || "";
        const displayName = profile.displayName || username;

        // Upsert user in MongoDB (create if not exists, otherwise update)
        const user = await User.findOneAndUpdate(
          { githubId },
          { githubId, username, displayName },
          { new: true, upsert: true, setDefaultsOnInsert: true },
        );

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
