import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { connectDB } from "./lib/db.js";
import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { googleAuth } from "./middlewares/googleAuth.js";
import authRoutes from "./routes/auth.route.js" ;
import pillRoutes from "./routes/pill.js";
import protectRoute from "./middlewares/auth.middleware.js";
import inferenceRoutes from "./routes/inference.routes.js";
import predictionRouter from "./routes/prediction.route.js";
import medicureRoutes from "./routes/medicure.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // For now, just pass the profile object
        // console.log(profile);
        return done(null, profile);

        // Later: save user in DB
        // const user = await User.findOne({ googleId: profile.id }) || await User.create({ ... });
        // return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user,done) => {
  done(null,user);
})

passport.deserializeUser((user,done) => {
  done(null,user);
});

app.use("/api/auth", authRoutes) ;

app.get("/auth/google",passport.authenticate("google",{
  scope : ["email" , "profile"],
  prompt : "select_account"
}))

app.get("/auth/google/callback",passport.authenticate("google",{
  failureRedirect : "http://localhost:5173/login"
}),
googleAuth, (req,res,next) => {
  res.redirect("http://localhost:5173/");
})

app.use("/api/pill",protectRoute, pillRoutes);

app.use("/api/medicure", medicureRoutes);

app.use("/api/inference", inferenceRoutes);

app.use("/api/prediction", predictionRouter);


// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  connectDB()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection failed:", err));
});
