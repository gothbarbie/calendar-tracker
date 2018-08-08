const router = require('express').Router()
const passport = require('passport')
const mongoose = require('mongoose')

const Calendar = mongoose.model('Calendar')

router.get('/', (req, res) => {
  console.log(req.user)
})

module.exports = router
