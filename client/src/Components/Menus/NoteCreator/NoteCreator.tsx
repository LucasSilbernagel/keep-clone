import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tooltip,
  useTheme,
} from '@mui/material'
import { Dispatch, SetStateAction, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomIsDarkTheme,
  atomIsDrawingActive,
  atomIsModalOpen,
  atomNewNote,
  atomNoteType,
  atomViewportWidth,
} from '../../../atoms'
import { MAIN_BREAKPOINT } from '../../../Constants'
import NoteFormContainer from '../../Forms/NoteFormContainer'
import PlusButton from './PlusButton'

interface NoteCreatorProps {
  creatingNote: boolean
  setCreatingNote: Dispatch<SetStateAction<boolean>>
  finishCreatingNote: () => void
}

const NoteCreator = (props: NoteCreatorProps): JSX.Element => {
  const { creatingNote, setCreatingNote, finishCreatingNote } = props

  /** The application theme */
  const theme = useTheme()
  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** Boolean that determines whether the dark (or light) theme is being used */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** State setter to update the type of the note that is being created or edited */
  const setNoteType = useSetRecoilState(atomNoteType)
  /** State setter to open/close the modal */
  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)
  /** State setter to open/close the drawing container */
  const setIsDrawingActive = useSetRecoilState(atomIsDrawingActive)
  /** State setter to update the new note */
  const setNewNote = useSetRecoilState(atomNewNote)

  /** Ref for the hidden file input (image upload) */
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  /** When the image upload button is clicked, click the inner hidden file input */
  const handleFileInputWrapperClick = () => {
    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.click()
    }
  }

  /** Function open the modal with the image form */
  const openImageModal = () => {
    setNoteType('image')
    openModal()
  }

  /** Function called when the image upload button is clicked */
  const handleFileUpload = (event: { target: { files: FileList | null } }) => {
    if (event.target.files) {
      const image = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (base64) => {
        setNewNote((currentNote) => {
          const editedNote = { ...currentNote }
          if (base64.target && typeof base64.target.result === 'string') {
            editedNote.image = base64.target?.result
          }
          editedNote.userGoogleId = JSON.parse(
            window.localStorage.userProfile
          ).googleId
          editedNote.lastEdited = Date.now()
          return editedNote
        })
      }
      reader.readAsDataURL(image)
      openImageModal()
    }
  }

  /** Function to open the modal */
  const openModal = () => setIsModalOpen(true)

  /** Function to create a new text note */
  const createTextNote = () => {
    setNoteType('text')
    setCreatingNote(true)
  }

  /** Function to create a new checklist, on desktop */
  const createDesktopChecklist = () => {
    setNoteType('checklist')
    setCreatingNote(true)
  }

  /** Function to create a new checklist, on mobile */
  const createMobileChecklist = () => {
    setNoteType('checklist')
    openModal()
  }

  /** Function to create a new drawing */
  const createDrawing = () => {
    setNoteType('drawing')
    setIsDrawingActive(true)
  }

  /** Function to create a new recording */
  const createRecording = () => {
    setNoteType('recording')
    openModal()
  }

  /** The styles for the note creator inner Box */
  const noteCreatorBoxStyle = isDarkTheme
    ? {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#202123',
        border: '1px solid #525355',
        borderRadius: '10px',
      }
    : {
        display: 'flex',
        justifyContent: 'space-between',
      }

  if (viewportWidth > MAIN_BREAKPOINT) {
    return (
      <Paper
        elevation={3}
        sx={
          isDarkTheme
            ? {
                backgroundColor: '#202123',
                borderRadius: '10px',
                width: '100%',
                marginTop: '2em',
              }
            : {
                width: '100%',
                marginTop: '2em',
              }
        }
      >
        {creatingNote ? (
          <>
            <NoteFormContainer
              finishCreatingNote={finishCreatingNote}
              inModal={false}
            />
          </>
        ) : (
          <Box sx={noteCreatorBoxStyle}>
            <Button
              onClick={createTextNote}
              disableRipple
              sx={{
                textTransform: 'initial',
                color: theme.palette.secondary.light,
                fontWeight: 'bold',
                fontSize: '1rem',
                width: '68%',
                cursor: 'text',
                padding: '0.5em 0.5em 0.5em 1em',
                justifyContent: 'flex-start',
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
                '&:focus': {
                  boxShadow: 4,
                },
              }}
            >
              Take a note...
            </Button>
            <Box>
              <Tooltip title="New checklist">
                <IconButton
                  aria-label="new checklist"
                  onClick={createDesktopChecklist}
                >
                  <CheckBoxOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New drawing">
                <IconButton aria-label="new drawing" onClick={createDrawing}>
                  <BrushOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New recording">
                <IconButton
                  aria-label="new recording"
                  onClick={createRecording}
                >
                  <MicNoneOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New image">
                <>
                  <IconButton
                    aria-label="new image"
                    onClick={handleFileInputWrapperClick}
                  >
                    <InsertPhotoOutlinedIcon />
                  </IconButton>
                  <input
                    type="file"
                    accept="image/*"
                    ref={hiddenFileInput}
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Paper>
    )
  } else {
    return (
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: theme.palette.primary.dark,
          padding: '0.5em 0',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              width: '70px',
              height: '25px',
              position: 'absolute',
              left: '85%',
              top: '-9px',
              transform: 'translateX(-50%)',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              background: isDarkTheme ? '#202123' : theme.palette.common.white,
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{ position: 'absolute', right: '-11px', bottom: '-35px' }}
              >
                <PlusButton />
              </Box>
            </Box>
          </Box>
          <IconButton
            aria-label="new checklist"
            onClick={createMobileChecklist}
          >
            <CheckBoxOutlinedIcon />
          </IconButton>
          <IconButton aria-label="new drawing" onClick={createDrawing}>
            <BrushOutlinedIcon />
          </IconButton>
          <IconButton aria-label="new recording" onClick={createRecording}>
            <MicNoneOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="new image"
            onClick={handleFileInputWrapperClick}
          >
            <InsertPhotoOutlinedIcon />
            <input
              type="file"
              accept="image/*"
              ref={hiddenFileInput}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </IconButton>
        </Box>
      </Paper>
    )
  }
}

export default NoteCreator
