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

const NoteFormDesktop = (props: IComponentProps) => {
  const { handleNoteTextChange, noteBeingEdited, editingID } = props

  const newNote = useRecoilValue(atomNewNote)

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          autoFocus
          multiline
          placeholder="Take a note..."
          size="small"
          onChange={handleNoteTextChange}
          value={editingID ? noteBeingEdited.text : newNote.text}
          variant="outlined"
          sx={{
            width: '100%',
            paddingLeft: '0.2em',
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
        />
      </Grid>
    </Grid>
  )
}

export default NoteFormDesktop
