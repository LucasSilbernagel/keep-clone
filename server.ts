import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { noteRouter } from './endpoints'
import path from 'path'
require('dotenv').config()

const app: Express = express()
const port: string | number = process.env.PORT || 5001
let database: mongoose.Connection

/** Connect to the database */
const connectToDatabase = () => {
  const uri: string = process.env.DB ?? ''
  const options: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
  if (database) {
    return
  }
  mongoose.connect(uri, options)
  database = mongoose.connection
  database.once('open', async () => {
    console.log('Database connected successfully')
  })
  database.on('error', () => {
    console.log('Error connecting to database')
  })
}
connectToDatabase()

mongoose.Promise = global.Promise
app.use((req: Request, res: Response, next) => {
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
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
app.use((err: string, req: Request, res: Response, next: () => void) => {
  console.error(err)
  next()
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
