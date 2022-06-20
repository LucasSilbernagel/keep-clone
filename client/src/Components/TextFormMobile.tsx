import { ChangeEventHandler } from 'react'
import { TextField, Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { atomEditingID, atomNewNote, atomNoteBeingEdited } from '../atoms'

interface TextFormMobileProps {
  handleNoteTextChange: ChangeEventHandler<HTMLInputElement>
  handleNoteTitleChange: ChangeEventHandler<HTMLInputElement>
}

const TextFormMobile = (props: TextFormMobileProps) => {
  const { handleNoteTextChange, handleNoteTitleChange } = props

  /** A new note */
  const newNote = useRecoilValue(atomNewNote)
  /** The note being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** The ID of the note being edited */
  const editingID = useRecoilValue(atomEditingID)

  return (
    <Grid container sx={{ padding: '0.5em' }}>
      <Grid item xs={12}>
        <TextField
          multiline
          placeholder="Title"
          onChange={handleNoteTitleChange}
          value={editingID ? noteBeingEdited.title : newNote.title}
          variant="outlined"
          sx={{
            width: '100%',
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
          placeholder="Note"
          size="small"
          onChange={handleNoteTextChange}
          value={editingID ? noteBeingEdited.text : newNote.text}
          variant="outlined"
          sx={{
            width: '100%',
            maxHeight: '80vh',
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

export default TextFormMobile
