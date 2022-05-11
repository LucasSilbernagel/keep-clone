import { ChangeEventHandler } from 'react'
import { TextField, Grid, Button } from '@mui/material'
import { INewNote } from '../../Interfaces'
import { useRecoilValue } from 'recoil'
import { atomNewNote } from '../../atoms'

interface IComponentProps {
  handleNoteTextChange: ChangeEventHandler<HTMLInputElement>
  finishCreatingNote: () => void
}

const NoteFormDesktop = (props: IComponentProps) => {
  const { handleNoteTextChange, finishCreatingNote } = props

  const newNote = useRecoilValue(atomNewNote)

  return (
    <Grid container sx={{ padding: '0.5em' }}>
      <Grid item xs={12}>
        <TextField
          autoFocus
          multiline
          placeholder="Take a note..."
          size="small"
          onChange={handleNoteTextChange}
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

export default NoteFormDesktop
