require('dotenv').config()

const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const path = require('path')
const authRoutes = require('./routes/auth-routes')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

const app = express()

// Setup server
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(require('morgan')('combined')) // Logging
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true })) //
app.use(
  session({
    store: new RedisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.REDIS_SECRET,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// ROUTES
app.use('/auth', authRoutes)

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
