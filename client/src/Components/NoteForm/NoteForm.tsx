import { ChangeEventHandler } from 'react'
import { TextField, Grid, Button } from '@mui/material'
import { INewNote } from '../../Interfaces'

interface IComponentProps {
  handleChange: ChangeEventHandler<HTMLInputElement>
  newNote: INewNote
  finishCreatingNote: () => void
}

const NoteForm = (props: IComponentProps) => {
  const { handleChange, newNote, finishCreatingNote } = props

  return (
    <Grid container sx={{ padding: '0.5em' }}>
      <Grid item xs={12}>
        <TextField
          autoFocus
          multiline
          placeholder="Take a note..."
          size="small"
          onChange={handleChange}
          value={newNote.text}
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
        />
      </Grid>
      <Grid item container xs={12} justifyContent="flex-end">
        <Grid item>
          <Button
            onClick={finishCreatingNote}
            color="inherit"
            sx={{ textTransform: 'initial' }}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NoteForm
