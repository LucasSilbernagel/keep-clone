import { ChangeEvent, useState } from 'react'
import { Grid, useTheme, Paper, Button } from '@mui/material'
import NoteList from '../Components/NoteList'
import { IExistingNote } from '../Interfaces'
import { useEffect } from 'react'
import DesktopAppBar from '../Components/AppBar/DesktopAppBar'
import MobileAppBar from '../Components/AppBar/MobileAppBar'
import { atomNewNote, atomViewportWidth } from '../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import NoteFormContainer from '../Components/NoteForm/NoteFormContainer'

interface IComponentProps {
  getNotes: () => void
  notes: Array<IExistingNote>
  editNote: (id: string) => void
  editingID: string
  saveNote: () => void
  cancelEdit: () => void
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  noteBeingEdited: IExistingNote
  logOut: () => void
}

const NoteView = (props: IComponentProps): JSX.Element => {
  const {
    getNotes,
    notes,
    editNote,
    editingID,
    saveNote,
    cancelEdit,
    handleNoteTextChange,
    noteBeingEdited,
    logOut,
  } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const [creatingNote, setCreatingNote] = useState(false)

  const theme = useTheme()

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  /** Display all saved notes when the page first loads */
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

  const createNote = () => {
    setCreatingNote(true)
  }

  /** Save the new note to the database */
  const saveNewNote = () => {
    axios
      .post('/api/notes', newNote)
      .then((res) => {
        if (res.data) {
          getNotes()
          setNewNote({ text: '', userGoogleId: '' })
        }
      })
      .catch((err) => console.log(err))
  }

  const finishCreatingNote = () => {
    setCreatingNote(false)
    if (newNote.text.length > 0) {
      saveNewNote()
    }
  }

  return (
    <>
      {creatingNote ? (
        <div
          style={{
            background: 'transparent',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            position: 'fixed',
            zIndex: 10,
          }}
          onClick={finishCreatingNote}
        ></div>
      ) : null}
      {viewportWidth > 1011 ? (
        <DesktopAppBar logOut={logOut} />
      ) : (
        <MobileAppBar logOut={logOut} />
      )}
      <Grid container item>
        <Grid container item lg={12} justifyContent="center">
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
                <NoteFormContainer finishCreatingNote={finishCreatingNote} />
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
        </Grid>
        <Grid item container>
          <NoteList notes={notes} getNotes={getNotes} />
        </Grid>
      </Grid>
    </>
  )
}

export default NoteView
