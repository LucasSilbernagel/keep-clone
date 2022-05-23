import { useState, MouseEvent, useEffect } from 'react'
import {
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from '@mui/material'
import { atomNewNote, atomViewportWidth } from '../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axios from 'axios'
import { IExistingNote, INewNote } from '../Interfaces'
import { ENote } from '../Enums'

interface IComponentProps {
  getNotes: () => void
  note: IExistingNote
  handleCloseModal: () => void
  noteBeingEdited: IExistingNote
  editingID: string
  saveNote: () => void
}

const NoteModalFooter = (props: IComponentProps): JSX.Element => {
  const {
    getNotes,
    note,
    handleCloseModal,
    noteBeingEdited,
    editingID,
    saveNote,
  } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  const [noteCopy, setNoteCopy] = useState<IExistingNote | INewNote>(ENote)

  /** Anchor for the "more" menu */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (editingID) {
      setNoteCopy(noteBeingEdited)
    } else {
      setNoteCopy(newNote)
    }
  }, [editingID, newNote, noteBeingEdited])

  const handleClickMore = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  /** Post the duplicate note to the database */
  const saveNoteCopy = () => {
    axios
      .post('/api/notes', {
        text: noteCopy.text,
        userGoogleId: noteCopy.userGoogleId,
      })
      .then((res) => {
        if (res.data) {
          getNotes()
          setNoteCopy({ text: '', userGoogleId: '' })
        }
      })
      .catch((err) => console.error(err))
  }

  const copyNote = () => {
    saveNoteCopy()
    saveNote()
    handleCloseModal()
    setAnchorEl(null)
  }

  const deleteNote = (id: string) => {
    setNewNote({ text: '', userGoogleId: '' })
    handleCloseModal()
    setAnchorEl(null)
    axios
      .delete(`/api/notes/${id}`)
      .then((res) => {
        if (res.data) {
          getNotes()
        }
      })
      .catch((err) => console.error(err))
  }

  if (viewportWidth < 1011) {
    return (
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
            <MenuItem onClick={() => copyNote()}>Make a copy</MenuItem>
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
    )
  } else {
    return (
      <>
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-end"
          sx={{ padding: '0.5em' }}
        >
          <Typography sx={{ fontSize: '0.9rem' }}>Edited 9:13 p.m.</Typography>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item container xs={2}>
            <Grid item container xs={4}>
              <Grid item>
                <Tooltip title="Add image">
                  <IconButton aria-label="add image" color="secondary">
                    <ImageOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item>
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
                <MenuItem onClick={() => copyNote()}>Make a copy</MenuItem>
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
          <Grid item>
            <Button
              onClick={handleCloseModal}
              color="inherit"
              sx={{ textTransform: 'initial', fontWeight: 'bold' }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default NoteModalFooter
