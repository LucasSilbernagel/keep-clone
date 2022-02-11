import { ChangeEvent } from 'react'
import { Grid, Typography, IconButton, TextField, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { disableNonEditingButtons } from '../LogicHelpers'
import { INote } from '../Interfaces'

interface IComponentProps {
  note: INote
  notes: Array<INote>
  deleteNote: (id: string) => void
  editNote: (id: string) => void
  editingID: string
  saveNote: () => void
  cancelEdit: () => void
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  noteBeingEdited: INote
}

const NoteContent = (props: IComponentProps) => {
  const {
    note,
    notes,
    editingID,
    handleNoteTextChange,
    saveNote,
    noteBeingEdited,
    cancelEdit,
    deleteNote,
    editNote,
  } = props

  /** If a note is being edited, display an editing text field, a save button, and a cancel button. */
  if (note._id === editingID) {
    return (
      <Grid
        item
        key={note._id}
        sx={{
          width: {
            xs: '180px',
            sm: '250px',
          },
          maxWidth: {
            xs: '180px',
            sm: '250px',
          },
        }}
      >
        <Paper elevation={2}>
          <Grid container>
            <Grid item>
              <TextField
                color="info"
                multiline
                variant="outlined"
                defaultValue={note.text}
                onChange={handleNoteTextChange}
                sx={{
                  maxHeight: '212px',
                  width: '100%',
                  overflowX: 'hidden',
                  overflowY: 'auto',
                }}
                InputProps={{
                  sx: {
                    lineHeight: '1.5',
                  },
                }}
              />
            </Grid>
            <Grid
              item
              container
              sx={{
                padding: '10px 0px',
              }}
            >
              <Grid item>
                <IconButton
                  onClick={saveNote}
                  disabled={!noteBeingEdited.text.length}
                  color="inherit"
                >
                  <SaveIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={cancelEdit} color="inherit">
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
    /** For notes that are not being edited, display the note along with a delete button and an edit button. */
  } else {
    return (
      <Grid
        item
        key={note._id}
        sx={{
          width: {
            xs: '180px',
            sm: '250px',
          },
          maxWidth: {
            xs: '180px',
            sm: '250px',
          },
        }}
      >
        <Paper elevation={2}>
          <Grid item container>
            <Grid item>
              <Typography
                sx={{
                  maxHeight: '180px',
                  padding: '1em 1.6em 1em 0.9em',
                  overflow: 'hidden',
                }}
              >
                {note.text}
              </Typography>
            </Grid>
            <Grid
              item
              container
              sx={{
                padding: '10px 0px',
              }}
            >
              <Grid item>
                <IconButton
                  color="inherit"
                  onClick={() => deleteNote(note._id)}
                  disabled={disableNonEditingButtons(notes, note, editingID)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="inherit"
                  onClick={() => editNote(note._id)}
                  disabled={disableNonEditingButtons(notes, note, editingID)}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  }
}

export default NoteContent
