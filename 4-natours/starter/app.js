const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')

const app = express()

//middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log('i am middleware😊😊')
  next()
})

//routes
app.use('/api/v1/tours', tourRouter)

module.exports = app
