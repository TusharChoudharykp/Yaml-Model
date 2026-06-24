import dotenv from "dotenv";
dotenv.config();

import express from "express";

import cors from "cors";

import session from "express-session";

import passport from "passport";

import "./config/passport";

import deployRoute from "./routes/deploy-routes";

import authRoute from "./routes/auth-routes";

import k8sRoute from "./routes/k8s-routes";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,

    credentials: true,
  })
);

app.use(express.json());

const isProduction = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,        // required for https
      // sameSite: "none",    // required for cross-domain
      secure: isProduction,              //false for localhost
      sameSite: isProduction ? "none" : "lax",  //lax for localhost
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000  // 24 hours
    }
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/deploy", deployRoute);

app.use("/auth", authRoute);

app.use("/k8s", k8sRoute);

app.listen(5000, () => {

  console.log("Server running on port 5000");
  console.log("CALLBACK:", process.env.GITHUB_CALLBACK_URL); // verify
  console.log("FRONTEND:", process.env.FRONTEND_URL); // verify
});