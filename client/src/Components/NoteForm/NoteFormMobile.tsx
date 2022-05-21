import { ChangeEventHandler } from 'react'
import { TextField, Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { atomNewNote } from '../../atoms'

interface IComponentProps {
  handleNoteTextChange: ChangeEventHandler<HTMLInputElement>
}

const NoteFormMobile = (props: IComponentProps) => {
  const { handleNoteTextChange } = props

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
          value={newNote.text}
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
