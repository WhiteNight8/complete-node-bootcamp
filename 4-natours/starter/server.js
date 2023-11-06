const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' })

const app = require('./app')
const DB = process.env.DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((con) => {
    console.log(con.connections)
    console.log('db connection established')
  })

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app runnning on port ${port}`)
})
