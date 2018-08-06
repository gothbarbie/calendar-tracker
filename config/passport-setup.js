const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

// Setup Passport
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, cb) => {
      // callback
      cb(null, Object.assign({}, profile, { accessToken, refreshToken }))
    }
  )
)

passport.serializeUser((user, cb) => cb(null, user))

passport.deserializeUser((obj, cb) => cb(null, obj))
