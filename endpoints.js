/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const router = express.Router()
const Note = require('./models/Note')

/** Return all notes for the authenticated user */
router.get('/notes', async (req, res, next) => {
  await Note.find({ userGoogleId: req.query.userGoogleId })
    .then((data) => res.json(data))
    .catch(next)
})

/** Post a new note */
router.post('/notes', async (req, res, next) => {
  await Note.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
})

/** Edit a note with a specific ID */
router.put('/notes/:id', async (req, res, next) => {
  await Note.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: 'Updated successfully' }))
    .catch(next, () =>
      res.status(400).json({ error: 'Unable to update the database' })
    )
})

/** Delete a note with a specific ID */
router.delete('/notes/:id', async (req, res, next) => {
  await Note.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

/** Delete multiple notes by ID */
router.post('/notes/batchDelete', async (req, res, next) => {
  const { ids } = req.body
  await Note.deleteMany({
    _id: { $in: ids },
  })
    .then((data) => res.json(data))
    .catch(next)
})

/** Edit multiple notes by ID */
router.post('/notes/:editField', async (req, res, next) => {
  const { ids } = req.body
  const editField = req.params.editField
  if (editField === 'isPinned') {
    await Note.updateMany(
      { isPinned: false, _id: { $in: ids } },
      { $set: { isPinned: true } }
    )
      .then((data) => res.json(data))
      .catch(next)
  }
})

module.exports = router
