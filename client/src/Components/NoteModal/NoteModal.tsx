import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Dialog, Grid, IconButton, Slide, useTheme } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { forwardRef, JSXElementConstructor, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomEditingID,
  atomIsDarkTheme,
  atomIsLoading,
  atomIsModalOpen,
  atomNewNote,
  atomNoteBeingEdited,
  atomNoteList,
  atomNotes,
  atomViewportWidth,
} from '../../atoms'
import {
  BLANK_EXISTING_NOTE,
  BLANK_NEW_NOTE,
  MAIN_BREAKPOINT,
} from '../../Constants'
import { getNotes } from '../../LogicHelpers'
import NoteFormContainer from '../Forms/NoteFormContainer'
import NoteModalFooter from './NoteModalFooter'

/** Transition for the note modal */
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<
      unknown,
      string | JSXElementConstructor<unknown>
    >
  },
  ref: React.Ref<unknown>
) {
  return <Slide ref={ref} direction="up" {...props} />
})

interface NoteModalProps {
  saveNewNote: () => void
  finishCreatingNote: () => void
  deleteNote: (id: string) => void
  creatingNote: boolean
}

const NoteModal = (props: NoteModalProps): JSX.Element => {
  const { saveNewNote, finishCreatingNote, deleteNote, creatingNote } = props

  /** The application theme */
  const theme = useTheme()
  /** Boolean that determines whether the dark theme (or light theme) is being used */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** The ID of the note that is being edited */
  const [editingID, setEditingID] = useRecoilState(atomEditingID)
  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** Boolean that determines whether the modal is open */
  const [isModalOpen, setIsModalOpen] = useRecoilState(atomIsModalOpen)
  /** A new note */
  const [newNote, setNewNote] = useRecoilState(atomNewNote)
  /** The note that is being edited */
  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)
  /** State setter to update the application loading state */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** State setter to update the array of checklist items for a note */
  const setNoteList = useSetRecoilState(atomNoteList)
  /** The start position of a screen swipe */
  const [touchStart, setTouchStart] = useState(null)
  /** The end position of a screen swipe */
  const [touchEnd, setTouchEnd] = useState(null)

  /** Save a new note when the modal is closed, if the newNote state has content. */
  useEffect(() => {
    if (
      !isModalOpen &&
      !creatingNote &&
      (newNote.text ||
        newNote.title ||
        newNote.list.some((item) => item.text.length > 0) ||
        newNote.drawing ||
        newNote.recording ||
        newNote.image)
    ) {
      saveNewNote()
    }
    // eslint-disable-next-line
	}, [
    isModalOpen,
    newNote.drawing,
    newNote.recording,
    newNote.image,
    newNote.list,
    newNote.text,
    newNote.title,
  ])

  /** Save an edited note to the database */
  const saveEditedNote = () => {
    if (
      (noteBeingEdited.text && noteBeingEdited.text.length > 0) ||
      (noteBeingEdited.title && noteBeingEdited.title.length > 0) ||
      noteBeingEdited.list.some((item) => item.text.length > 0) ||
      (noteBeingEdited.drawing && noteBeingEdited.drawing.length > 0) ||
      (noteBeingEdited.recording && noteBeingEdited.recording.length > 0) ||
      (noteBeingEdited.image && noteBeingEdited.image.length > 0)
    ) {
      axios
        .put(`/api/notes/${noteBeingEdited._id}`, noteBeingEdited)
        .then((res) => {
          if (res.data) {
            getNotes(setIsLoading, setNotes)
          }
        })
        .then(() => {
          setNoteBeingEdited(BLANK_EXISTING_NOTE)
          setNewNote(BLANK_NEW_NOTE)
          setNoteList([{ text: '', done: false, id: nanoid() }])
        })
        .then(() => {
          setEditingID('')
        })
        .catch((err) => console.error(err))
    } else {
      deleteNote(noteBeingEdited._id)
    }
  }

  /** Function to close the modal */
  const handleCloseModal = () => {
    if (editingID) {
      saveEditedNote()
    }
    setIsModalOpen(false)
  }

  /** Function called when the "back" button is clicked in the modal */
  const handleBack = () => {
    if (newNote.text || noteBeingEdited.title) {
      saveEditedNote()
      handleCloseModal()
    } else {
      handleCloseModal()
    }
  }

  /** The required distance between touchStart and touchEnd to be detected as a swipe */
  const minSwipeDistance = 5

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onTouchStart = (e: any) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX)

  /** Left swipe on mobile should work the same as tapping the Back button. */
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    if (isLeftSwipe) handleBack()
  }

  return (
    <Dialog
      onClose={handleCloseModal}
      open={isModalOpen}
      fullScreen={viewportWidth < MAIN_BREAKPOINT}
      fullWidth={viewportWidth > MAIN_BREAKPOINT}
      TransitionComponent={Transition}
      data-testid="modal"
    >
      <Box
        component="div"
        sx={
          isDarkTheme
            ? {
                backgroundColor: theme.palette.background.default,
                border:
                  viewportWidth > MAIN_BREAKPOINT ? '1px solid #525355' : '',
                height: '100%',
              }
            : {}
        }
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Grid container>
          {viewportWidth < MAIN_BREAKPOINT ? (
            <Grid item xs={12}>
              <IconButton
                aria-label="Save or cancel"
                color="secondary"
                onClick={handleBack}
                data-testid="back-button"
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
          ) : null}
          <NoteFormContainer
            finishCreatingNote={finishCreatingNote}
            inModal={true}
          />
        </Grid>
        <NoteModalFooter
          handleCloseModal={handleCloseModal}
          saveEditedNote={saveEditedNote}
          saveNewNote={saveNewNote}
          deleteNote={deleteNote}
        />
      </Box>
    </Dialog>
  )
}

export default NoteModal
