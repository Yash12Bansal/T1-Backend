require("dotenv").config();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const ejsFolder = path.join(__dirname, "routes");

// Configure Express to serve static files from the views folder
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passport");
const authRoute = require("./routes/web_auth");
const app = express();
// const logout = require('express-passport-logout');
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
// app.use(cors());
app.use(express.static(ejsFolder));

app.use(cookieParser("secret"));
// app.use(
//   bodyParser.urlencoded({
//
//   })
// );
// app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// const flash = require('connect-flash');
// const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const port = 8080;
const db = require("./config/mongoose");
// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
// app.use(cors());
app.use(express.json());
// const { OAuth2Client } = require("google-auth-library");
// const User = require("./models/User.js");
// saveUninitialized: false,
// resave: false,
// cookie: {
//   secure: false,
//   maxAge: 24 * 60 * 60 * 1000,
// }

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "secret",
    cookie: {
      secure: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      path: "/",
    },
  })
);

// app.use(
//   cookieSession({
//     name: "My Cookie",
//     keys: ["cyberwolve"],
//     maxAge: 24 * 60*60 * 1000,
//   })
// );

// authUser = (request, accessToken, refreshToken, profile, done) => {
//   return done(null, profile);
// };
// var GoogleStrategy = require("passport-google-oauth2").Strategy;
// //Use "GoogleStrategy" as the Authentication Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:3001/auth/google/callback",
//       passReqToCallback: true,
//     },
//     authUser
//   )
// );
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    // origin: "http://localhost:3000",

    origin: "https://t1-expert.onrender.com",
    methods: "GET,POST,DELETE,PUT",
    credentials: true,
  })
);
app.set("trust proxy", 1);

// const passportConfig = require('./config/passport')(passport);
// app.use("/auth", authRoute);
app.use("/", require("./routes"));
// const client = new OAuth2Client(
//   "550164351391-335ovnajfvmmce9u2eesnrrpjpocsgqc.apps.googleusercontent.com"
// );
// app.get("/checker", (req, res) => {
//   console.log("CHECKER CALLED ");
//   return "hello";
// });
// app.post("/details",)
// app.post("/auth", (req, res) => {
//   console.log("evaluating post");
//   console.log(req.body);
//   const { idToken } = req.body;
//   verify(req.body, res).catch(console.error);
// });
// async function verify(data, res) {
//   const { idToken: token } = data;
//   const { email: id } = data;
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     // Specify the CLIENT_ID of the app that accesses the backend
//     // Or, if multiple clients access the backend:
//     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload["sub"];
//   console.log(userid);
//   User.findOne({ email: id }).then((existingUser) => {
//     if (!existingUser) {
//       User.create({ email: id, ss: { name: "Raghav" } })
//         .then(() => {
//           res.send({
//             kq: 1,
//             msg: "Nahi tha re User",
//           });
//         })
//         .catch((err) => {
//           res.send({
//             kq: 0,
//             msg: "kết nối DB thất bại",
//           });
//           console.error(err);
//         });
//       // new User({ googleId: userid }).save();
//     } else {
//       res.send({
//         kq: 1,
//         msg: "Phele se hi tha re User",
//       });
//     }
//   });

//   // If request specified a G Suite domain:
//   // const domain = payload['hd'];
// }
// verify().catch(console.error);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: 'YOUR_CLIENT_ID',
//       clientSecret: 'YOUR_CLIENT_SECRET',
//       callbackURL: 'http://localhost:3000/auth/google/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // You can create or retrieve a user in your database here using the profile data.
//       // For this example, we'll just return the profile.
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// app.use("/", require("./routes"));
// app.get("/",function(req,res){
// });
// app.get("/", function (req, res) {
//   console.log("get called");
//   res.send("<h1>T1 Life Backend Work Started<h1/>");
// });"172.20.21.207" || "localhost",
app.listen(port, function (err) {
  if (err) {
    console.log("Error occured");
    return;
  } else {
    console.log("Express server is runni successfully");
  }
});
// you need to use the alias of the table with the column of course id in it

// like sce.course_id

// as stated in the comment below this might change your result so use the table name of the table of that is used in the where clause or the alias of that table
