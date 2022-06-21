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
      <Grid item xs={12}>
        <TextField
          multiline
          placeholder="Title"
          onChange={handleNoteTitleChange}
          value={editingID ? noteBeingEdited.title : newNote.title}
          variant="outlined"
          sx={{
            width: '100%',
            paddingLeft: viewportWidth > MAIN_BREAKPOINT ? '0.2em' : '',
            maxHeight: '50vh',
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
          inputProps={{ style: { fontSize: '1.2rem' }, maxLength: 1000 }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
        />
      </Grid>
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
