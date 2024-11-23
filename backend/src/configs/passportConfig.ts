const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "270412715554-h83o5vmfdh24q9hkc6efse6d95ihaaa6.apps.googleusercontent.com", // Replace with your Google Client ID
      clientSecret: "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", // Replace with your Google Client Secret
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user information (e.g., save to DB)
      console.log(profile); // Log the profile for reference
      done(null, profile);
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
