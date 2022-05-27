import { forwardRef, ChangeEvent } from 'react'
import { Dialog, Grid, IconButton, Slide } from '@mui/material'
import { atomIsModalOpen, atomNewNote, atomViewportWidth } from '../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NoteFormContainer from '../Components/NoteForm/NoteFormContainer'
import { IExistingNote } from '../Interfaces'
import { TransitionProps } from '@mui/material/transitions'
import NoteModalFooter from './NoteModalFooter'

/** Transition for the note modal */
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide ref={ref} direction="up" {...props} />
})

interface IComponentProps {
  getNotes: () => void
  note: IExistingNote
  saveNewNote: () => void
  noteBeingEdited: IExistingNote
  editingID: string
  saveNote: () => void
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const NoteModal = (props: IComponentProps): JSX.Element => {
  const {
    getNotes,
    note,
    saveNewNote,
    noteBeingEdited,
    editingID,
    saveNote,
    handleNoteTextChange,
  } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const [isModalOpen, setIsModalOpen] = useRecoilState(atomIsModalOpen)

  const newNote = useRecoilValue(atomNewNote)

  const handleCloseModal = () => {
    if (editingID) {
      saveNote()
    } else {
      saveNewNote()
    }
    setIsModalOpen(false)
  }

  /** Function called when the "back" button is clicked in the modal */
  const handleBack = () => {
    if (newNote.text) {
      saveNote()
      handleCloseModal()
    } else {
      handleCloseModal()
    }
  }

  return (
    <Dialog
      onClose={handleCloseModal}
      open={isModalOpen}
      fullScreen={viewportWidth < 1011}
      fullWidth={viewportWidth > 1011}
      TransitionComponent={Transition}
    >
      <Grid container>
        {viewportWidth < 1011 ? (
          <Grid item xs={12}>
            <IconButton
              aria-label="Save or cancel"
              color="secondary"
              onClick={handleBack}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
        ) : null}
        <NoteFormContainer
          noteBeingEdited={noteBeingEdited}
          editingID={editingID}
          handleNoteTextChange={handleNoteTextChange}
        />
      </Grid>
      <NoteModalFooter
        getNotes={getNotes}
        note={note}
        handleCloseModal={handleCloseModal}
        editingID={editingID}
        noteBeingEdited={noteBeingEdited}
        saveNote={saveNote}
      />
    </Dialog>
  )
}

export default NoteModal