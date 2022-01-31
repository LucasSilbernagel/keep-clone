import React from 'react'
import { Grid } from '@mui/material'
import NoteFormLogical from '../../Components/NoteForm/NoteFormLogical'
import NoteList from '../../Components/NoteList'

const NoteViewPresentational = (props) => {
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
