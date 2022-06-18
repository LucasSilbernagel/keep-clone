import { ChangeEvent, ChangeEventHandler } from 'react'
import { TextField, Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { atomEditingID, atomNewNote, atomNoteBeingEdited } from '../../../atoms'

interface IComponentProps {
  handleNoteTextChange: ChangeEventHandler<HTMLInputElement>
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextFormDesktop = (props: IComponentProps) => {
  const { handleNoteTextChange, handleNoteTitleChange } = props

  const newNote = useRecoilValue(atomNewNote)

  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)

  const editingID = useRecoilValue(atomEditingID)

  return (
    <Grid container>
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

export default TextFormDesktop