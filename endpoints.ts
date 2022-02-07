import express, { Request, Response } from 'express'
const router = express.Router()
import Note from './models/Note'

/** Return all notes */
router.get('/notes', (req: Request, res: Response, next) => {
  Note.find({}, 'text')
    .then((data: any) => res.json(data))
    .catch(next)
})

/** Post a new note */
router.post('/notes', (req: Request, res: Response, next) => {
  Note.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
})

/** Edit a note with a specific ID */
router.put('/notes/:id', (req: Request, res: Response, next) => {
  Note.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: 'Updated successfully' }))
    .catch(next, () =>
      res.status(400).json({ error: 'Unable to update the database' })
    )
})

/** Delete a note with a specific ID */
router.delete('/notes/:id', (req: Request, res: Response, next) => {
  Note.findOneAndDelete({ _id: req.params.id })
    .then((data: any) => res.json(data))
    .catch(next)
})

export { router as noteRouter }
