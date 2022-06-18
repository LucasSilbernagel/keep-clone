import { forwardRef } from 'react'
import { Dialog, Grid, IconButton, Slide, Box, useTheme } from '@mui/material'
import {
  atomIsModalOpen,
  atomNewNote,
  atomViewportWidth,
  atomIsDarkTheme,
  atomNoteBeingEdited,
  atomEditingID,
  atomIsLoading,
  atomNotes,
  atomNoteList,
} from '../../atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NoteFormContainer from '../NoteForms/NoteFormContainer'
import { TransitionProps } from '@mui/material/transitions'
import NoteModalFooter from './NoteModalFooter'
import axios from 'axios'
import { getNotes } from '../../LogicHelpers'
import { BLANK_EXISTING_NOTE, BLANK_NEW_NOTE } from '../../Constants'
import { nanoid } from 'nanoid'

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
  saveNewNote: () => void
  finishCreatingNote: () => void
  deleteNote: (id: string) => void
}

const NoteModal = (props: IComponentProps): JSX.Element => {
  const { saveNewNote, finishCreatingNote, deleteNote } = props

  const theme = useTheme()

  const isDarkTheme = useRecoilValue(atomIsDarkTheme)

  const [editingID, setEditingID] = useRecoilState(atomEditingID)

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const [isModalOpen, setIsModalOpen] = useRecoilState(atomIsModalOpen)

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)

  const setIsLoading = useSetRecoilState(atomIsLoading)

  const setNotes = useSetRecoilState(atomNotes)

  const setNoteList = useSetRecoilState(atomNoteList)

  /** Save an edited note to the database */
  const saveEditedNote = () => {
    if (
      (noteBeingEdited.text && noteBeingEdited.text.length > 0) ||
      (noteBeingEdited.title && noteBeingEdited.title.length > 0) ||
      noteBeingEdited.list.some((item) => item.text.length > 0)
    ) {
      axios
        .put(`/api/notes/${noteBeingEdited._id}`, noteBeingEdited)
        .then((res) => {
          if (res.data) {
            getNotes(setIsLoading, setNotes)
          }
        })
        .then(() => {
          setEditingID('')
          setNoteBeingEdited(BLANK_EXISTING_NOTE)
          setNewNote(BLANK_NEW_NOTE)
          setNoteList([{ text: '', done: false, id: nanoid() }])
        })
        .catch((err) => console.error(err))
    } else {
      deleteNote(noteBeingEdited._id)
    }
  }

  const handleCloseModal = () => {
    if (editingID) {
      saveEditedNote()
    } else {
      saveNewNote()
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
            finishCreatingNote={finishCreatingNote}
            inModal={true}
          />
        </Grid>
        <NoteModalFooter
          handleCloseModal={handleCloseModal}
          saveEditedNote={saveEditedNote}
          deleteNote={deleteNote}
        />
      </Box>
    </Dialog>
  )
}

export default NoteModal
