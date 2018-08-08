const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const { google } = require('googleapis')

const User = mongoose.model('User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

// Setup Passport
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // callback, return user data

      try {
        const existingUser = await User.findOne({
          googleId: profile.id,
        })

        if (existingUser) {
          return done(null, existingUser)
        }

        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
        })

        // app.session.accessToken = accessToken
        console.log('session:', app.session)

        user.save()

        done(null, user)
      } catch (err) {
        console.error(err)
        done(err, null)
      }
    }
  )
)
