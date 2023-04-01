const express = require('express');
const ExpressError = require('./expressError')
const userRoutes = require('./routes/userRoutes')
const middleware = require('./middleware')
const router = new express.Router()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(middleware.logger)

app.use('/items', userRoutes)

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.use((error, req, res, next) => {
  let status = error.status || 500
  let msg = error.msg
  return res.status(status).json({
    error: { msg, status }
  })
})



module.exports = app
