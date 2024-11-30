import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { Request, Response } from "express";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID, // Replace with your Google Client ID
      clientSecret: process.env.GOOGLE_CLIENTSECRET, // Replace with your Google Client Secret
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user information (e.g., save to DB)
      // console.log(profile); // Log the profile for reference
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

export const passportRoutes = (app: any) => {
  // Login route
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // Callback route
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: process.env.FRONTEND_URL,
    }),
    (req: Request, res: Response) => {
      const url = process.env.FRONTEND_URL || "/";

      return res.redirect(`${url}/login?login=success`);
      // res.redirect("/profile");
    }
  );

  // Profile route
  app.get("/profile", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }
    res.send(`
    <h1>Profile</h1>
    <pre>${JSON.stringify(req.user, null, 2)}</pre>
    <a href="/logout">Logout</a>
  `);
  });

  // Logout route
  app.get("/logout", (req: Request, res: Response) => {
    req.logout(() => {
      res.redirect("/");
    });
  });
};

export default passport;
