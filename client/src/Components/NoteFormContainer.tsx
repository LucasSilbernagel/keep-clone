import { ChangeEvent } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  atomIsDarkTheme,
  atomNoteType,
  atomEditingID,
  atomNoteBeingEdited,
  atomNewNote,
} from '../atoms'
import { Box, Grid, Button } from '@mui/material'
import { noteFormStyles } from '../LogicHelpers'
import ChecklistForm from './ChecklistForm'
import TextForm from './TextForm'
import DrawingForm from './DrawingForm'

interface NoteFormContainerProps {
  finishCreatingNote: () => void
  inModal: boolean
}

const NoteFormContainer = (props: NoteFormContainerProps) => {
  const { finishCreatingNote, inModal } = props

  /** Boolean that determines whether the dark (or light) theme is being used */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** The type of note that is being edited or created */
  const noteType = useRecoilValue(atomNoteType)
  /** The ID of the note that is being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** Function to create a new checklist, on desktop */
  const setNoteBeingEdited = useSetRecoilState(atomNoteBeingEdited)
  /** State setter to update the contents of a new note */
  const setNewNote = useSetRecoilState(atomNewNote)

  /** Change the title of a note as the user types into the editing field */
  const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editingID) {
      setNoteBeingEdited((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.title = e.target.value
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    } else {
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.title = e.target.value
        editedNote.text = prevNote.text
        editedNote.lastEdited = Date.now()
        editedNote.userGoogleId = JSON.parse(
          window.localStorage.userProfile
        ).googleId
        return editedNote
      })
    }
  }

  /** Change the text of a note as the user types into the editing field */
  const handleNoteTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editingID) {
      setNoteBeingEdited((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.text = e.target.value
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    } else {
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.text = e.target.value
        editedNote.title = prevNote.title
        editedNote.lastEdited = Date.now()
        editedNote.userGoogleId = JSON.parse(
          window.localStorage.userProfile
        ).googleId
        return editedNote
      })
    }
  }

  return (
    <Box sx={noteFormStyles(inModal, isDarkTheme)}>
      {noteType === 'text' && (
        <TextForm
          handleNoteTextChange={handleNoteTextChange}
          handleNoteTitleChange={handleNoteTitleChange}
        />
      )}
      {noteType === 'checklist' && (
        <ChecklistForm handleNoteTitleChange={handleNoteTitleChange} />
      )}
      {noteType === 'drawing' && (
        <DrawingForm handleNoteTitleChange={handleNoteTitleChange} />
      )}
      {!inModal && (
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-end"
          sx={{ paddingBottom: '0.5em', paddingRight: '1em' }}
        >
          <Button
            onClick={finishCreatingNote}
            color="inherit"
            sx={{ textTransform: 'initial', fontWeight: 'bold' }}
          >
            Close
          </Button>
        </Grid>
      )}
    </Box>
  )
}

export default NoteFormContainer