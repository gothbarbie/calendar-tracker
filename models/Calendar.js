const mongoose = require('mongoose')
const { Schema } = mongoose

const calendarSchema = new Schema({
  events: Array,
  createdAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
})

mongoose.model('Calendar', calendarSchema)
