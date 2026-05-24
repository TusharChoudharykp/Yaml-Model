import dotenv from "dotenv";
dotenv.config();

import express from "express";

import cors from "cors";

import session from "express-session";

import passport from "passport";

import "./config/passport";

import deployRoute from "./routes/deploy-routes";

import authRoute from "./routes/auth-routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,

    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "secret",

    resave: false,

    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/deploy", deployRoute);

app.use("/auth", authRoute);

app.listen(5000, () => {

  console.log("Server running on port 5000");
  console.log("CALLBACK:", process.env.GITHUB_CALLBACK_URL); // verify
  console.log("FRONTEND:", process.env.FRONTEND_URL); // verify
});