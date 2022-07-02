import { ChangeEvent } from 'react'
import { Grid, Box } from '@mui/material'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  atomNewNote,
  atomNoteBeingEdited,
  atomEditingID,
  atomIsDrawingActive,
  atomIsModalOpen,
} from '../atoms'
import NoteTitleInput from './NoteTitleInput'

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
      <NoteTitleInput handleNoteTitleChange={handleNoteTitleChange} />
      {(noteBeingEdited.drawingImage || newNote.drawingImage) && (
        <Grid item xs={12}>
          <button onClick={editDrawing} style={{ border: 'none' }}>
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
      )}
    </Grid>
  )
}

export default DrawingForm
