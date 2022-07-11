import express, { Request, Response } from 'express'
const router = express.Router()
import Note from './models/Note'

/** Return all notes for the authenticated user */
router.get('/notes', async (req: Request, res: Response, next) => {
  await Note.find({ userGoogleId: req.query.userGoogleId })
    .then((data: any) => res.json(data))
    .catch(next)
})

/** Post a new note */
router.post('/notes', async (req: Request, res: Response, next) => {
  await Note.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
})

/** Edit a note with a specific ID */
router.put('/notes/:id', async (req: Request, res: Response, next) => {
  await Note.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: 'Updated successfully' }))
    .catch(next, () =>
      res.status(400).json({ error: 'Unable to update the database' })
    )
})

/** Delete a note with a specific ID */
router.delete('/notes/:id', async (req: Request, res: Response, next) => {
  await Note.findOneAndDelete({ _id: req.params.id })
    .then((data: any) => res.json(data))
    .catch(next)
})

/** Delete multiple notes by ID */
router.post('/notes/batchDelete', async (req: Request, res: Response, next) => {
  const { ids } = req.body
  await Note.deleteMany({
    _id: { $in: ids },
  })
    .then((data: any) => res.json(data))
    .catch(next)
})

/** Edit multiple notes by ID */
router.post('/notes/:editField', async (req: Request, res: Response, next) => {
  const { ids } = req.body
  const editField = req.params.editField
  if (editField === 'isPinned') {
    await Note.updateMany(
      { isPinned: false, _id: { $in: ids } },
      { $set: { isPinned: true } }
    )
      .then((data: any) => res.json(data))
      .catch(next)
  }
})

export { router as noteRouter }
