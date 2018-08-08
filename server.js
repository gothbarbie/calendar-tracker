require('dotenv').config()

const express = require('express')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

require('./models/User')
require('./models/Calendar')
require('./services/passport')

const mongodbUri = `mongodb://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@ds115592.mlab.com:15592/calendar-tracker`

mongoose.Promise = global.Promise
mongoose.connect(
  mongodbUri,
  { useNewUrlParser: true }
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.on('open', () => console.log('Successfully connected to MongoDB'))

const app = express()

// Setup server
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(require('morgan')('combined')) // Logging
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true })) //
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
)

app.use(passport.initialize())
app.use(passport.session())

// ROUTES
app.use('/auth', require('./routes/auth-routes'))
app.use('/calendar', require('./routes/calendar-routes'))

app.get('/', (req, res) => res.render('home', { user: req.user }))

const PORT = process.env.SERVER_PORT || 3000

app.listen(PORT, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Listening on port ${PORT}...`)
  }
})
