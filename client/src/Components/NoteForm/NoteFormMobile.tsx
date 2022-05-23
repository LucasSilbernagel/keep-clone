import { ChangeEventHandler } from 'react'
import { TextField, Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { atomNewNote } from '../../atoms'
import { IExistingNote } from '../../Interfaces'

interface IComponentProps {
  handleNoteTextChange: ChangeEventHandler<HTMLInputElement>
  noteBeingEdited: IExistingNote
  editingID: string
}

const NoteFormMobile = (props: IComponentProps) => {
  const { handleNoteTextChange, noteBeingEdited, editingID } = props

  const newNote = useRecoilValue(atomNewNote)

  return (
    <Grid container sx={{ padding: '0.5em' }}>
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

export default NoteFormMobile
