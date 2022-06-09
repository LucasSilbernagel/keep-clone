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
import {
  atomNewNote,
  atomViewportWidth,
  atomIsDarkTheme,
  atomNoteBeingEdited,
} from '../../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axios from 'axios'
import { IExistingNote, INewNote } from '../../types'
import { BLANK_NEW_NOTE } from '../../Constants'
import ReactTimeAgo from 'react-time-ago'

interface IComponentProps {
  getNotes: () => void
  handleCloseModal: () => void
  editingID: string
  saveNote: () => void
}

const NoteModalFooter = (props: IComponentProps): JSX.Element => {
  const { getNotes, handleCloseModal, editingID, saveNote } = props

  const isDarkTheme = useRecoilValue(atomIsDarkTheme)

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)

  const [noteCopy, setNoteCopy] = useState<IExistingNote | INewNote>(
    BLANK_NEW_NOTE
  )

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
        title: noteCopy.title,
        list: noteCopy.list,
        userGoogleId: noteCopy.userGoogleId,
        lastEdited: Date.now(),
      })
      .then((res) => {
        if (res.data) {
          getNotes()
          setNoteCopy({
            text: '',
            title: '',
            list: [{ text: '', done: false }],
            userGoogleId: '',
            lastEdited: 0,
          })
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
    setNewNote({
      text: '',
      title: '',
      list: [{ text: '', done: false }],
      userGoogleId: '',
      lastEdited: 0,
    })
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
        sx={{
          position: 'fixed',
          bottom: 0,
          backgroundColor: isDarkTheme ? 'inherit' : '#FFFFFF',
        }}
      >
        <Grid item container xs={3}></Grid>
        {noteBeingEdited.lastEdited === 0 ? null : (
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ fontSize: '0.9rem' }}>
              Edited{' '}
              <ReactTimeAgo
                date={noteBeingEdited.lastEdited}
                locale="en-US"
                timeStyle="round-minute"
              />
            </Typography>
          </Grid>
        )}
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
            <MenuItem onClick={() => deleteNote(noteBeingEdited._id)}>
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
        {noteBeingEdited.lastEdited === 0 ? null : (
          <Grid
            item
            container
            xs={12}
            justifyContent="flex-end"
            sx={{ padding: '0.5em' }}
          >
            <Typography sx={{ fontSize: '0.9rem' }}>
              Edited{' '}
              <ReactTimeAgo
                date={noteBeingEdited.lastEdited}
                locale="en-US"
                timeStyle="round-minute"
              />
            </Typography>
          </Grid>
        )}
        <Grid container justifyContent="space-between">
          <Grid item container xs={2}>
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
                <MenuItem onClick={() => deleteNote(noteBeingEdited._id)}>
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
