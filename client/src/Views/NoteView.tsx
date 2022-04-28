import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Grid } from '@mui/material'
import NoteFormContainer from '../Components/NoteForm/NoteFormContainer'
import NoteList from '../Components/NoteList'
import { IExistingNote, INewNote } from '../Interfaces'
import { useEffect } from 'react'
import DesktopAppBar from '../Components/AppBar/DesktopAppBar'
import MobileAppBar from '../Components/AppBar/MobileAppBar'
import { atomViewportWidth } from '../atoms'
import { useRecoilValue } from 'recoil'

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

  /** Display all saved notes when the page first loads */
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {viewportWidth > 1011 ? (
        <DesktopAppBar logOut={logOut} />
      ) : (
        <MobileAppBar logOut={logOut} />
      )}
      <Grid container item>
        <Grid container item lg={12} justifyContent="center">
          <NoteFormContainer
            getNotes={getNotes}
            editingID={editingID}
            newNote={newNote}
            setNewNote={setNewNote}
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
