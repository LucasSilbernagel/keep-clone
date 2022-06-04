import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import {
  useTheme,
  Paper,
  Button,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material'
import { atomViewportWidth, atomIsDarkTheme, atomNoteType } from '../atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import NoteFormContainer from '../Components/NoteForm/NoteFormContainer'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { IExistingNote } from '../types'
import CrosshairButton from '../Components/CrosshairButton'

interface IComponentProps {
  noteBeingEdited: IExistingNote
  editingID: string
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  creatingNote: boolean
  setCreatingNote: Dispatch<SetStateAction<boolean>>
  finishCreatingNote: () => void
}

const NoteCreator = (props: IComponentProps): JSX.Element => {
  const {
    noteBeingEdited,
    editingID,
    handleNoteTextChange,
    handleNoteTitleChange,
    creatingNote,
    setCreatingNote,
    finishCreatingNote,
  } = props

  const theme = useTheme()

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const isDarkTheme = useRecoilValue(atomIsDarkTheme)

  const setNoteType = useSetRecoilState(atomNoteType)

  const createTextNote = () => {
    setNoteType('text')
    setCreatingNote(true)
  }

  const createChecklist = () => {
    setNoteType('checklist')
    setCreatingNote(true)
  }

  if (viewportWidth > 1011) {
    return (
      <Paper elevation={3} sx={{ width: '100%', marginTop: '2em' }}>
        {creatingNote ? (
          <NoteFormContainer
            noteBeingEdited={noteBeingEdited}
            editingID={editingID}
            handleNoteTextChange={handleNoteTextChange}
            handleNoteTitleChange={handleNoteTitleChange}
            finishCreatingNote={finishCreatingNote}
          />
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
                  onClick={createChecklist}
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
                <CrosshairButton />
              </Box>
            </Box>
          </Box>
          <IconButton aria-label="new checklist">
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
