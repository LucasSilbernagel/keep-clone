import { ChangeEvent, ChangeEventHandler } from 'react'
import { TextField, Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import {
  atomEditingID,
  atomNewNote,
  atomNoteBeingEdited,
  atomViewportWidth,
} from '../atoms'
import { MAIN_BREAKPOINT } from '../Constants'
import NoteTitleInput from './NoteTitleInput'

interface TextFormProps {
  handleNoteTextChange: ChangeEventHandler<HTMLInputElement>
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextForm = (props: TextFormProps) => {
  const { handleNoteTextChange, handleNoteTitleChange } = props

  /** A new note */
  const newNote = useRecoilValue(atomNewNote)
  /** The note being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** The ID of the note being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** The width of the browser, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  return (
    <Grid
      container
      sx={viewportWidth <= MAIN_BREAKPOINT ? { padding: '0.5em' } : {}}
    >
      <NoteTitleInput handleNoteTitleChange={handleNoteTitleChange} />
      <Grid item xs={12}>
        <TextField
          autoFocus
          multiline
          placeholder={
            viewportWidth > MAIN_BREAKPOINT ? 'Take a note...' : 'Note'
          }
          size="small"
          onChange={handleNoteTextChange}
          value={editingID ? noteBeingEdited.text : newNote.text}
          variant="outlined"
          sx={{
            width: '100%',
            paddingLeft: viewportWidth > MAIN_BREAKPOINT ? '0.2em' : '',
            maxHeight: viewportWidth > MAIN_BREAKPOINT ? '50vh' : '80vh',
            overflowY: 'auto',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
          }}
        />
      </Grid>
    </Grid>
  )
}

export default TextForm
