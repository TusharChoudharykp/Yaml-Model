import express from "express";

import passport from "passport";

const router =
  express.Router();

router.get(
  "/github",

  passport.authenticate(
    "github",
    {
      scope: ["repo", "user:email"],
    }
  )
);

router.get(
  "/github/callback",

  passport.authenticate(
    "github",
    {
      failureRedirect: "/",
    }
  ),

  (_req, res) => {

    res.redirect(process.env.FRONTEND_URL + "/dashboard");
  }
);

router.get(
  "/me",

  (req, res) => {

    if (!req.user) {

      return res
        .status(401)
        .json({
          success: false,
        });
    }

    return res.json({

      success: true,

      user: req.user,
    });
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false });
    }
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });
});

export default router;