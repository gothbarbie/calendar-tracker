const router = require('express').Router()
const passport = require('passport')

// Auth Login
router.get('/login', (req, res) => {
  res.render('login')
})

// Auth Logout
router.get('/logout', (req, res) => {
  res.logout()
})

// Authenticate with Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
  })
)

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.send('Authenticated', console.log(req.user))
})

module.exports = router
