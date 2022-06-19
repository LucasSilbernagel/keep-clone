import { Dispatch, SetStateAction } from 'react'
import {
  useTheme,
  Paper,
  Button,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material'
import {
  atomViewportWidth,
  atomIsDarkTheme,
  atomNoteType,
  atomIsModalOpen,
} from '../atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import NoteFormContainer from './NoteFormContainer'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import PlusButton from './PlusButton'

interface IComponentProps {
  creatingNote: boolean
  setCreatingNote: Dispatch<SetStateAction<boolean>>
  finishCreatingNote: () => void
}

const NoteCreator = (props: IComponentProps): JSX.Element => {
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

  if (viewportWidth > 1011) {
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
          <Box
            sx={
              isDarkTheme
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
            }
          >
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
                <IconButton aria-label="new drawing">
                  <BrushOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New recording">
                <IconButton aria-label="new recording">
                  <MicNoneOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New image">
                <IconButton aria-label="new image">
                  <InsertPhotoOutlinedIcon />
                </IconButton>
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
          <IconButton aria-label="new drawing">
            <BrushOutlinedIcon />
          </IconButton>
          <IconButton aria-label="new recording">
            <MicNoneOutlinedIcon />
          </IconButton>
          <IconButton aria-label="new image">
            <InsertPhotoOutlinedIcon />
          </IconButton>
        </Box>
      </Paper>
    )
  }
}

export default NoteCreator
