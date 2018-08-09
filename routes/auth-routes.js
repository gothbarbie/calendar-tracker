const router = require('express').Router()
const passport = require('passport')
const gcal = require('google-calendar')
// Auth Login
router.get('/login', (req, res) => {
  res.render('login')
})

// Auth Logout
router.get('/logout', (req, res) => {
  req.logout()
  res.send('Logged out')
})

router.get('/user', (req, res) => res.send(JSON.stringify(req.user)))

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
  // check if user has calendar id set

  // - if not, list calendars and have user pick one

  // fetch new items

  const calendar = new gcal.GoogleCalendar(req.user.accessToken)

  const date = new Date()
  const today = date.toISOString()
  date.setDate(date.getDate() - 30)
  const minimum = date.toISOString()

  calendar.events.list(
    'gothbarbie84@gmail.com',
    {
      orderBy: 'startTime',
      singleEvents: true,
      timeMax: today,
      timeMin: minimum,
    },
    (err, data) => {
      // console.log(data.items)
    }
  )

  res.send('calendar')
})

module.exports = router
