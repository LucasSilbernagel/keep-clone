import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {noteRouter} from './endpoints'
import path from 'path'
require('dotenv').config()
const app: Express = express()
const port: string | number = process.env.PORT || 5001

const uri: any = process.env.DB
const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

/** Connect to the database */
mongoose
  .connect(uri, options)
  // .then(() => console.log(`Database connected successfully`))
  // .catch((err: any) => console.log(err))

mongoose.Promise = global.Promise
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(bodyParser.json())
app.use('/api', noteRouter)
app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
app.use((err: string, req: Request, res: Response, next: () => void) => {
  console.log(err)
  next()
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
