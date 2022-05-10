import { Dispatch, SetStateAction } from 'react'
import { Grid, Paper, Button, useTheme } from '@mui/material'
import NoteFormContainer from '../Components/NoteForm/NoteFormContainer'
import { INewNote } from '../Interfaces'

interface IComponentProps {
  newNote: INewNote
  setNewNote: Dispatch<SetStateAction<INewNote>>
  creatingNote: boolean
  setCreatingNote: Dispatch<SetStateAction<boolean>>
  finishCreatingNote: () => void
}

const NoteCreator = (props: IComponentProps): JSX.Element => {
  const {
    newNote,
    setNewNote,
    creatingNote,
    setCreatingNote,
    finishCreatingNote,
  } = props

  const theme = useTheme()

  const createNote = () => {
    setCreatingNote(true)
  }

  return (
    <Grid
      item
      xs={10}
      sm={8}
      md={6}
      lg={4}
      sx={{ marginBottom: '2em', zIndex: 30 }}
    >
      <Paper elevation={3} sx={{ width: '100%', marginTop: '2em' }}>
        {creatingNote ? (
          <NoteFormContainer
            newNote={newNote}
            setNewNote={setNewNote}
            finishCreatingNote={finishCreatingNote}
          />
        ) : (
          <Button
            onClick={createNote}
            disableRipple
            sx={{
              textTransform: 'initial',
              color: theme.palette.secondary.light,
              fontWeight: 'bold',
              fontSize: '1rem',
              width: '100%',
              cursor: 'text',
              padding: '0.5em 0.5em 0.5em 1em',
              justifyContent: 'flex-start',
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'transparent',
              },
              '&:focus': {
                boxShadow: 4,
              },
            }}
          >
            Take a note...
          </Button>
        )}
      </Paper>
    </Grid>
  )
}

export default NoteCreator
