const express = require('express')
const router = express.Router()
const Note = require('./models/note')

/** Return all notes */
router.get('/notes', (req, res, next) => {
  Note.find({}, 'text')
    .then((data) => res.json(data))
    .catch(next)
})

/** Post a new note */
router.post('/notes', (req, res, next) => {
  Note.create(req.body)
    .then((data) => res.json(data))
    .catch(next)
})

/** Edit a note with a specific ID */
router.put('/notes/:id', (req, res, next) => {
  Note.findByIdAndUpdate(req.params.id, req.body)
    .then((note) => res.json({ msg: 'Updated successfully' }))
    .catch(next, (err) =>
      res.status(400).json({ error: 'Unable to update the database' })
    )
})

/** Delete a note with a specific ID */
router.delete('/notes/:id', (req, res, next) => {
  Note.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

module.exports = router
