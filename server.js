/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const noteRouter = require('./endpoints')
const path = require('path')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5001

//connect to the database
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(`Error connecting to database: ${err}`))

mongoose.Promise = global.Promise
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use('/api', noteRouter)
app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
app.use((err, _req, _res, next) => {
  console.error(err)
  next()
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
