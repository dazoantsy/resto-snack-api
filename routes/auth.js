const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Start GitHub OAuth login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failed" }),
  (req, res) => {
    // Create a JWT after successful OAuth
    const payload = {
      userId: req.user._id,
      githubId: req.user.githubId,
      username: req.user.username,
      role: req.user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // For this course project, we return the token as JSON.
    // A frontend can store it and send it in Authorization: Bearer <token>
    res.json({
      message: "Login successful",
      token,
      user: req.user,
    });
  }
);

// Simple failure route
router.get("/failed", (req, res) => {
  res.status(401).json({ message: "OAuth login failed" });
});

// Logout (ends session)
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
