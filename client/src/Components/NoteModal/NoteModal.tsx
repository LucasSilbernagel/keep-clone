import { forwardRef, ChangeEvent } from 'react'
import { Dialog, Grid, IconButton, Slide, Box, useTheme } from '@mui/material'
import {
  atomIsModalOpen,
  atomNewNote,
  atomViewportWidth,
  atomIsDarkTheme,
  atomNoteBeingEdited,
} from '../../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NoteFormContainer from '../NoteForms/NoteFormContainer'
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
  saveNewNote: () => void
  editingID: string
  saveNote: () => void
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  finishCreatingNote: () => void
}

const NoteModal = (props: IComponentProps): JSX.Element => {
  const {
    getNotes,
    saveNewNote,
    editingID,
    saveNote,
    handleNoteTextChange,
    handleNoteTitleChange,
    finishCreatingNote,
  } = props

  const theme = useTheme()

  const isDarkTheme = useRecoilValue(atomIsDarkTheme)

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const [isModalOpen, setIsModalOpen] = useRecoilState(atomIsModalOpen)

  const newNote = useRecoilValue(atomNewNote)

  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)

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
    if (newNote.text || noteBeingEdited.title) {
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
      <Box
        sx={
          isDarkTheme
            ? {
                backgroundColor: theme.palette.background.default,
                border: viewportWidth > 1011 ? '1px solid #525355' : '',
                height: '100%',
              }
            : {}
        }
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
            editingID={editingID}
            handleNoteTextChange={handleNoteTextChange}
            handleNoteTitleChange={handleNoteTitleChange}
            finishCreatingNote={finishCreatingNote}
            inModal={true}
          />
        </Grid>
        <NoteModalFooter
          getNotes={getNotes}
          handleCloseModal={handleCloseModal}
          editingID={editingID}
          saveNote={saveNote}
        />
      </Box>
    </Dialog>
  )
}

export default NoteModal
