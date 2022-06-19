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
  atomEditingID,
  atomNotes,
  atomIsLoading,
} from '../atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axios from 'axios'
import { IExistingNote, INewNote } from '../types'
import { BLANK_NEW_NOTE } from '../Constants'
import ReactTimeAgo from 'react-time-ago'
import { nanoid } from 'nanoid'
import { getNotes } from '../LogicHelpers'

interface IComponentProps {
  handleCloseModal: () => void
  saveEditedNote: () => void
  deleteNote: (id: string) => void
}

const NoteModalFooter = (props: IComponentProps): JSX.Element => {
  const { handleCloseModal, saveEditedNote, deleteNote } = props

  /** Boolean that determines whether the dark theme (or light theme) is being used */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** The ID of the note that is being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** A new note */
  const [newNote, setNewNote] = useRecoilState(atomNewNote)
  /** The note that is being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** A copy of a note */
  const [noteCopy, setNoteCopy] = useState<IExistingNote | INewNote>(
    BLANK_NEW_NOTE
  )
  /** State setter to update the application loading state */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** Anchor for the "more" menu */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  /** Boolean that determines whether the "more" menu is open */
  const open = Boolean(anchorEl)

  /** Create a copy of the note that is being created or edited */
  useEffect(() => {
    if (editingID) {
      setNoteCopy(noteBeingEdited)
    } else {
      setNoteCopy(newNote)
    }
  }, [editingID, newNote, noteBeingEdited])

  /** Function to open the "more" menu */
  const handleClickMore = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  /** Function to close the "more" menu */
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
          getNotes(setIsLoading, setNotes)
          setNoteCopy({
            text: '',
            title: '',
            list: [{ text: '', done: false, id: nanoid() }],
            userGoogleId: '',
            lastEdited: 0,
          })
        }
      })
      .catch((err) => console.error(err))
  }

  /** Function to copy a note from inside the modal */
  const copyNote = () => {
    saveNoteCopy()
    saveEditedNote()
    handleCloseModal()
    setAnchorEl(null)
  }

  /** Function to delete a note from inside the modal */
  const deleteNoteFromModal = (id: string) => {
    setNewNote({
      text: '',
      title: '',
      list: [{ text: '', done: false, id: nanoid() }],
      userGoogleId: '',
      lastEdited: 0,
    })
    handleCloseModal()
    setAnchorEl(null)
    deleteNote(id)
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
            <MenuItem onClick={() => deleteNoteFromModal(noteBeingEdited._id)}>
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
                <MenuItem
                  onClick={() => deleteNoteFromModal(noteBeingEdited._id)}
                >
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
