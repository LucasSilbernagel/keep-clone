import { ChangeEventHandler } from 'react'
import { TextField, Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { atomNewNote } from '../../../atoms'
import { IExistingNote } from '../../../types'

interface IComponentProps {
  handleNoteTextChange: ChangeEventHandler<HTMLInputElement>
  handleNoteTitleChange: ChangeEventHandler<HTMLInputElement>
  noteBeingEdited: IExistingNote
  editingID: string
}

const TextFormMobile = (props: IComponentProps) => {
  const {
    handleNoteTextChange,
    handleNoteTitleChange,
    noteBeingEdited,
    editingID,
  } = props

  const newNote = useRecoilValue(atomNewNote)

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
