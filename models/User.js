const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  calendarId: String,
  accessToken: String,
  refreshToken: String,
  lastFetchAt: { type: Date },
})

mongoose.model('User', userSchema)
