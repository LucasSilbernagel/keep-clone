import { useState } from 'react'
import { useTheme, Paper, Button, IconButton, Box } from '@mui/material'
import { atomNewNote, atomViewportWidth } from '../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import NoteFormContainer from '../Components/NoteForm/NoteFormContainer'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import AddBoxIcon from '@mui/icons-material/AddBox'

interface IComponentProps {
  getNotes: () => void
}

const NoteView = (props: IComponentProps): JSX.Element => {
  const { getNotes } = props

  const [creatingNote, setCreatingNote] = useState(false)

  const theme = useTheme()

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  const createNote = () => {
    setCreatingNote(true)
  }

  /** Save the new note to the database */
  const saveNewNote = () => {
    axios
      .post('/api/notes', newNote)
      .then((res) => {
        if (res.data) {
          getNotes()
          setNewNote({ text: '', userGoogleId: '' })
        }
      })
      .catch((err) => console.log(err))
  }

  const finishCreatingNote = () => {
    setCreatingNote(false)
    if (newNote.text.length > 0) {
      saveNewNote()
    }
  }

  if (viewportWidth > 1011) {
    return (
      <Paper elevation={3} sx={{ width: '100%', marginTop: '2em' }}>
        {creatingNote ? (
          <NoteFormContainer finishCreatingNote={finishCreatingNote} />
        ) : (
          <Button
            onClick={createNote}
            disableRipple
            sx={{
              textTransform: 'initial',
              color: theme.palette.secondary.light,
              fontWeight: 'bold',
              fontSize: '1rem',
              width: '100%',
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
              background: theme.palette.common.white,
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <IconButton
                aria-label="new note"
                color="info"
                sx={{ position: 'absolute', right: '-11px', bottom: '-35px' }}
              >
                <AddBoxIcon sx={{ fontSize: '76px' }} />
              </IconButton>
            </Box>
          </Box>
          <IconButton aria-label="new checklist">
            <CheckBoxOutlinedIcon />
          </IconButton>
          <IconButton aria-label="new drawing">
            <BrushOutlinedIcon />
          </IconButton>
          <IconButton aria-label="new voice note">
            <MicNoneOutlinedIcon />
          </IconButton>
          <IconButton aria-label="new photo">
            <InsertPhotoOutlinedIcon />
          </IconButton>
        </Box>
      </Paper>
    )
  }
}

export default NoteView
