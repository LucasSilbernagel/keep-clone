import { useState, MouseEvent, forwardRef, useEffect } from 'react'
import {
  Dialog,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Slide,
} from '@mui/material'
import { atomIsModalOpen, atomNewNote } from '../atoms'
import { useRecoilState } from 'recoil'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NoteFormContainer from '../Components/NoteForm/NoteFormContainer'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axios from 'axios'
import { IExistingNote, INewNote } from '../Interfaces'
import { TransitionProps } from '@mui/material/transitions'
import { ENote } from '../Enums'

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
  finishCreatingNote: () => void
  getNotes: () => void
  note: IExistingNote
  saveNewNote: () => void
}

const NoteModal = (props: IComponentProps): JSX.Element => {
  const { finishCreatingNote, getNotes, note, saveNewNote } = props

  const [isModalOpen, setIsModalOpen] = useRecoilState(atomIsModalOpen)

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  const [noteCopy, setNoteCopy] = useState<INewNote>(ENote)

  /** Anchor for the "more" menu */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    setNoteCopy(newNote)
  }, [newNote])

  const handleClickMore = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  /** Post the duplicate note to the database */
  const saveNoteCopy = () => {
    axios
      .post('/api/notes', noteCopy)
      .then((res) => {
        if (res.data) {
          getNotes()
          setNoteCopy({ text: '', userGoogleId: '' })
        }
      })
      .catch((err) => console.log(err))
  }

  const copyNote = (note: IExistingNote) => {
    if (newNote.text) {
      saveNoteCopy()
      saveNewNote()
    }
    handleCloseModal()
    setAnchorEl(null)
  }

  const deleteNote = (id: string) => {
    setNewNote({ text: '', userGoogleId: '' })
    handleCloseModal()
    setAnchorEl(null)
    // axios
    //   .delete(`/api/notes/${id}`)
    //   .then((res) => {
    //     if (res.data) {
    //       getNotes()
    //     }
    //   })
    //   .catch((err) => console.log(err))
  }

  /** Function called when the "back" button is clicked in the modal */
  const handleBack = () => {
    if (newNote.text) {
      saveNewNote()
      handleCloseModal()
    } else {
      handleCloseModal()
    }
  }

  return (
    <Dialog
      onClose={handleCloseModal}
      open={isModalOpen}
      fullScreen
      TransitionComponent={Transition}
    >
      <Grid container>
        <Grid item xs={12}>
          <IconButton
            aria-label="Save or cancel"
            color="secondary"
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <NoteFormContainer finishCreatingNote={finishCreatingNote} />
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        sx={{ position: 'fixed', bottom: 0 }}
      >
        <Grid item container xs={4}>
          <Grid item>
            <IconButton aria-label="more" color="secondary">
              <AddBoxOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton aria-label="more" color="secondary">
              <PaletteOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container xs={5} justifyContent="center" alignItems="center">
          <Typography>Edited 9:13 p.m.</Typography>
        </Grid>
        <Grid item xs={1}>
          <Menu
            id="more-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'more-button',
            }}
          >
            <MenuItem onClick={() => deleteNote(note._id)}>
              Delete note
            </MenuItem>
            <MenuItem onClick={() => copyNote(note)}>Make a copy</MenuItem>
          </Menu>
        </Grid>
        <Grid item>
          <Tooltip title="More">
            <IconButton
              id="more-button"
              aria-controls={open ? 'more-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickMore}
              color="secondary"
              className="moreButton"
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default NoteModal
