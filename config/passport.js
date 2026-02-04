const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

/**
 * We store a small subset of the GitHub profile in the session.
 */
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
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
        // Keep it small: only what we need.
        const user = {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName || profile.username,
        };

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
