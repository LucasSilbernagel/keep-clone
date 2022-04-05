import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Grid } from '@mui/material'
import NoteFormContainer from '../Components/NoteForm/NoteFormContainer'
import NoteList from '../Components/NoteList'
import { IExistingNote, INewNote } from '../Interfaces'
import { useEffect } from 'react'
import MainAppBar from '../Components/MainAppBar'

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

  /** Display all saved notes when the page first loads */
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <MainAppBar logOut={logOut} />
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
          <NoteList
            notes={notes}
            deleteNote={deleteNote}
            editNote={editNote}
            editingID={editingID}
            saveNote={saveNote}
            cancelEdit={cancelEdit}
            handleNoteTextChange={handleNoteTextChange}
            noteBeingEdited={noteBeingEdited}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default NoteView
