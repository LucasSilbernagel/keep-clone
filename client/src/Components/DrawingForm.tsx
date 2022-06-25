import { ChangeEvent } from 'react'
import { TextField, Grid, Box } from '@mui/material'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  atomNewNote,
  atomNoteBeingEdited,
  atomEditingID,
  atomIsDrawingActive,
  atomIsModalOpen,
} from '../atoms'

interface DrawingFormProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const DrawingForm = (props: DrawingFormProps) => {
  const { handleNoteTitleChange } = props

  /** New note atom */
  const newNote = useRecoilValue(atomNewNote)
  /** The ID of the note that is being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** The note that is being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** State setter to open the drawing canvas */
  const setIsDrawingActive = useSetRecoilState(atomIsDrawingActive)
  /** State setter to open and close the modal */
  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)

  const editDrawing = () => {
    setIsModalOpen(false)
    setIsDrawingActive(true)
  }

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
      {noteBeingEdited.drawingImage ||
        (newNote.drawingImage && (
          <Grid item xs={12}>
            <button onClick={editDrawing}>
              <Box sx={{ backgroundColor: '#FFFFFF' }}>
                <img
                  src={
                    editingID
                      ? noteBeingEdited.drawingImage
                      : newNote.drawingImage
                  }
                  alt="drawing"
                  style={{ width: '100%', display: 'block' }}
                />
              </Box>
            </button>
          </Grid>
        ))}
    </Grid>
  )
}

export default DrawingForm
