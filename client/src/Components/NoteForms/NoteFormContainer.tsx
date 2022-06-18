import { ChangeEvent } from 'react'
import TextFormMobile from './TextForm/TextFormMobile'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  atomViewportWidth,
  atomIsDarkTheme,
  atomNoteType,
  atomEditingID,
  atomNoteBeingEdited,
  atomNewNote,
} from '../../atoms'
import { Box, Grid, Button } from '@mui/material'
import RenderNoteFormDesktop from '../RenderNoteForms/RenderNoteFormDesktop'
import { noteFormStyles } from '../../LogicHelpers'
import ChecklistForm from './ChecklistForm/ChecklistForm'

interface IComponentProps {
  finishCreatingNote: () => void
  inModal: boolean
}

const NoteFormContainer = (props: IComponentProps) => {
  const { finishCreatingNote, inModal } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const isDarkTheme = useRecoilValue(atomIsDarkTheme)

  const noteType = useRecoilValue(atomNoteType)

  const editingID = useRecoilValue(atomEditingID)

  const setNoteBeingEdited = useSetRecoilState(atomNoteBeingEdited)

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
      {viewportWidth > 1011 && (
        <RenderNoteFormDesktop
          handleNoteTextChange={handleNoteTextChange}
          handleNoteTitleChange={handleNoteTitleChange}
        />
      )}
      {viewportWidth <= 1011 && noteType === 'text' && (
        <TextFormMobile
          handleNoteTextChange={handleNoteTextChange}
          handleNoteTitleChange={handleNoteTitleChange}
        />
      )}
      {viewportWidth <= 1011 && noteType === 'checklist' && (
        <ChecklistForm handleNoteTitleChange={handleNoteTitleChange} />
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
