// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20");
// const GitHubStrategy = require("passport-github2");
// require("dotenv").config();
// const config = require("config");
// const Users = require("./models/User");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   Users.findById(id).then((user) => done(null, user));
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       callbackURL:process.env.GOOGLE_CALLBACK_URL,
//       clientID: process.env.GOOGLE_ClIENT_ID,
//       clientSecret:process.env.GOOGLE_ClIENT_SECRET,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       Users.findOne({ googleId: profile.id }).then((user) => {
//         if (user) {
//           done(null, user);
//         } else {
//           new User({
//             username: profile.displayName,
//             googleId: profile.id,
//           })
//             .save()
//             .then((newUser) => {
//               done(null, newUser);
//             });
//         }
//       });
//     }
//   )
// );
