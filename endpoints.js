/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const router = express.Router()
const Note = require('./models/Note')

/** Return all notes for the authenticated user */
router.get('/notes', async (req, res, next) => {
  await Note.find({ userGoogleId: req.query.userGoogleId.toString() })
    .then((data) => res.json(data))
    .catch(next)
})

/** Post a new note */
router.post('/notes', async (req, res, next) => {
  const sanitizedRequestBody = {
    text: req.body.text.toString(),
    title: req.body.title.toString(),
    list: req.body.list.map((item) => {
      return {
        text: item.text.toString(),
        done: Boolean(item.done),
        id: item.id.toString(),
      }
    }),
    drawing: req.body.drawing.toString(),
    drawingImage: req.body.drawingImage.toString(),
    recording: req.body.recording.toString(),
    recordingDuration: req.body.recordingDuration.toString(),
    image: req.body.image.toString(),
    isPinned: Boolean(req.body.isPinned),
    userGoogleId: req.body.userGoogleId.toString(),
    lastEdited: Number(req.body.lastEdited),
  }
  await Note.create(sanitizedRequestBody)
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

/** Edit multiple notes by ID */
router.post('/notes/:editField', async (req, res, next) => {
  const { ids } = req.body
  const sanitizedIds = ids.map((id) => id.toString())
  const editField = req.params.editField
  if (editField === 'isPinned') {
    await Note.updateMany(
      { isPinned: false, _id: { $in: sanitizedIds } },
      { $set: { isPinned: true } }
    )
      .then((data) => res.json(data))
      .catch(next)
  }
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
  const sanitizedIds = ids.map((id) => id.toString())
  await Note.deleteMany({
    _id: { $in: sanitizedIds },
  })
    .then((data) => res.json(data))
    .catch(next)
})

module.exports = router
