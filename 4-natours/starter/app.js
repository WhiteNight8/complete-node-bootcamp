const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')

const app = express()

//middleware
app.use(morgan('dev'))

app.use(express.json())

app.use((req, res, next) => {
  console.log('i am middleware😊😊')
  next()
})

//routes
app.use('/api/v1/tours', tourRouter)

const port = 3000
app.listen(port, () => {
  console.log(`app runnning on port ${port}`)
})
