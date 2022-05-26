import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useTheme, Paper, Button, IconButton, Box, Grid } from '@mui/material'
import { atomViewportWidth, atomIsModalOpen } from '../atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import NoteFormContainer from '../Components/NoteForm/NoteFormContainer'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { IExistingNote } from '../Interfaces'

interface IComponentProps {
  noteBeingEdited: IExistingNote
  editingID: string
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  creatingNote: boolean
  setCreatingNote: Dispatch<SetStateAction<boolean>>
  finishCreatingNote: () => void
}

const NoteCreator = (props: IComponentProps): JSX.Element => {
  const {
    noteBeingEdited,
    editingID,
    handleNoteTextChange,
    creatingNote,
    setCreatingNote,
    finishCreatingNote,
  } = props

  const theme = useTheme()

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)

  const createNote = () => {
    setCreatingNote(true)
  }

  const openModal = () => setIsModalOpen(true)

  if (viewportWidth > 1011) {
    return (
      <Paper elevation={3} sx={{ width: '100%', marginTop: '2em' }}>
        {creatingNote ? (
          <>
            <NoteFormContainer
              noteBeingEdited={noteBeingEdited}
              editingID={editingID}
              handleNoteTextChange={handleNoteTextChange}
            />
            <Grid
              item
              container
              xs={12}
              justifyContent="flex-end"
              sx={{ paddingBottom: '0.5em', paddingRight: '1em' }}
            >
              <Button
                onClick={finishCreatingNote}
                color="inherit"
                sx={{ textTransform: 'initial', fontWeight: 'bold' }}
              >
                Close
              </Button>
            </Grid>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={createNote}
              disableRipple
              sx={{
                textTransform: 'initial',
                color: theme.palette.secondary.light,
                fontWeight: 'bold',
                fontSize: '1rem',
                width: '75%',
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
              <IconButton aria-label="new checklist">
                <CheckBoxOutlinedIcon />
              </IconButton>
              <IconButton aria-label="new drawing">
                <BrushOutlinedIcon />
              </IconButton>
              <IconButton aria-label="new photo">
                <InsertPhotoOutlinedIcon />
              </IconButton>
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
              background: theme.palette.common.white,
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <IconButton
                aria-label="new note"
                color="info"
                sx={{ position: 'absolute', right: '-11px', bottom: '-35px' }}
                onClick={openModal}
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

export default NoteCreator
