import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Grid } from '@mui/material'
import NoteFormLogical from '../../Components/NoteForm/NoteFormLogical'
import NoteList from '../../Components/NoteList'
import { IExistingNote, INewNote } from '../../Interfaces'

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
}

const NoteViewPresentational = (props: IComponentProps): JSX.Element => {
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
  } = props

  return (
    <Grid container item>
      <Grid container item lg={12} justifyContent="center">
        <NoteFormLogical
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
  )
}

export default NoteViewPresentational
