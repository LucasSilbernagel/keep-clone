import { ChangeEvent } from 'react'
import { TextField, Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { atomNewNote } from '../../atoms'
import { IExistingNote } from '../../types'

interface IComponentProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  noteBeingEdited: IExistingNote
  editingID: string
}

const ChecklistFormDesktop = (props: IComponentProps) => {
  const { handleNoteTitleChange, noteBeingEdited, editingID } = props

  const newNote = useRecoilValue(atomNewNote)

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
    </Grid>
  )
}

export default ChecklistFormDesktop
