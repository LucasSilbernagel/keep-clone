import { ChangeEvent } from 'react'
import { TextField, Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { atomNewNote, atomNoteBeingEdited, atomEditingID } from '../atoms'

interface NoteTitleInputProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const NoteTitleInput = (props: NoteTitleInputProps) => {
  const { handleNoteTitleChange } = props

  /** New note atom */
  const newNote = useRecoilValue(atomNewNote)
  /** The ID of the note that is being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** The note that is being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)

  return (
    <Grid item xs={12}>
      <TextField
        multiline
        placeholder="Title"
        onChange={handleNoteTitleChange}
        value={editingID ? noteBeingEdited.title : newNote.title}
        variant="outlined"
        sx={{
          width: '100%',
          paddingLeft: '0.2em',
          maxHeight: '50vh',
          overflowY: 'auto',
          paddingRight: '2em',
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
  )
}

export default NoteTitleInput