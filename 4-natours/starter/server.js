const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: './config.env' })

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
