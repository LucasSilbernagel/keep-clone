import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Grid } from '@mui/material'
import NoteList from '../Components/NoteList'
import { IExistingNote, INewNote } from '../Interfaces'
import { useEffect } from 'react'
import DesktopAppBar from '../Components/AppBar/DesktopAppBar'
import MobileAppBar from '../Components/AppBar/MobileAppBar'
import { atomViewportWidth } from '../atoms'
import { useRecoilValue } from 'recoil'
import NoteCreator from '../Components/NoteCreator'
import axios from 'axios'

interface IComponentProps {
  getNotes: () => void
  notes: Array<IExistingNote>
  deleteNote: (id: string) => void
  editNote: (id: string) => void
  editingID: string
  saveNote: () => void
  cancelEdit: () => void
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  newNote: INewNote
  setNewNote: Dispatch<SetStateAction<INewNote>>
  noteBeingEdited: IExistingNote
  logOut: () => void
}

const NoteView = (props: IComponentProps): JSX.Element => {
  const {
    getNotes,
    notes,
    deleteNote,
    editNote,
    editingID,
    saveNote,
    cancelEdit,
    handleNoteTextChange,
    newNote,
    setNewNote,
    noteBeingEdited,
    logOut,
  } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const [creatingNote, setCreatingNote] = useState(false)

  /** Display all saved notes when the page first loads */
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

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
          <NoteCreator
            newNote={newNote}
            setNewNote={setNewNote}
            creatingNote={creatingNote}
            setCreatingNote={setCreatingNote}
            finishCreatingNote={finishCreatingNote}
          />
        </Grid>
        <Grid item container>
          <NoteList notes={notes} deleteNote={deleteNote} getNotes={getNotes} />
        </Grid>
      </Grid>
    </>
  )
}

export default NoteView
