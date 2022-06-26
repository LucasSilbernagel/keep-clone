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
import { BLANK_NEW_NOTE, MAIN_BREAKPOINT } from '../Constants'
import ReactTimeAgo from 'react-time-ago'
import { nanoid } from 'nanoid'
import { getNotes } from '../LogicHelpers'

interface NoteModalFooterProps {
  handleCloseModal: () => void
  saveEditedNote: () => void
  deleteNote: (id: string) => void
  saveNewNote: () => void
}

const NoteModalFooter = (props: NoteModalFooterProps): JSX.Element => {
  const { handleCloseModal, saveEditedNote, deleteNote, saveNewNote } = props

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
  const handleClickMoreMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  /** Function to close the "more" menu */
  const handleCloseMoreMenu = () => {
    setAnchorEl(null)
  }

  /** Post the duplicate note to the database */
  const saveNoteCopy = () => {
    axios
      .post('/api/notes', {
        text: noteCopy.text,
        title: noteCopy.title,
        list: noteCopy.list,
        drawing: noteCopy.drawing,
        drawingImage: noteCopy.drawingImage,
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
            drawing: '',
            drawingImage: '',
            userGoogleId: '',
            lastEdited: 0,
          })
        }
      })
      .catch((err) => console.error(err))
  }

  /** Function to copy a note from inside the modal */
  const copyNoteFromModal = () => {
    if (
      (noteBeingEdited.text && noteBeingEdited.text.length > 0) ||
      (noteBeingEdited.title && noteBeingEdited.title.length > 0) ||
      noteBeingEdited.list.some((item) => item.text.length > 0) ||
      (noteBeingEdited.drawing && noteBeingEdited.drawing.length > 0)
    ) {
      saveEditedNote()
      saveNoteCopy()
    }
    if (
      (newNote.text && newNote.text.length > 0) ||
      (newNote.title && newNote.title.length > 0) ||
      newNote.list.some((item) => item.text.length > 0) ||
      (newNote.drawing && newNote.drawing.length > 0)
    ) {
      saveNewNote()
    }
    handleCloseModal()
    setAnchorEl(null)
  }

  /** Function to delete a note from inside the modal */
  const deleteNoteFromModal = (id: string) => {
    setNewNote({
      text: '',
      title: '',
      list: [{ text: '', done: false, id: nanoid() }],
      drawing: '',
      drawingImage: '',
      userGoogleId: '',
      lastEdited: 0,
    })
    handleCloseModal()
    setAnchorEl(null)
    if (id) {
      deleteNote(id)
    }
  }

  if (viewportWidth < MAIN_BREAKPOINT) {
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
            onClose={handleCloseMoreMenu}
            MenuListProps={{
              'aria-labelledby': 'more-button',
              disablePadding: true,
            }}
          >
            <MenuItem onClick={() => deleteNoteFromModal(noteBeingEdited._id)}>
              Delete note
            </MenuItem>
            <MenuItem onClick={() => copyNoteFromModal()}>Make a copy</MenuItem>
          </Menu>
        </Grid>
        <Grid item>
          <Tooltip title="More">
            <IconButton
              id="more-button"
              aria-controls={open ? 'more-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickMoreMenu}
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
                onClose={handleCloseMoreMenu}
                MenuListProps={{
                  'aria-labelledby': 'more-button',
                  disablePadding: true,
                }}
              >
                <MenuItem
                  onClick={() => deleteNoteFromModal(noteBeingEdited._id)}
                >
                  Delete note
                </MenuItem>
                <MenuItem onClick={() => copyNoteFromModal()}>
                  Make a copy
                </MenuItem>
              </Menu>
            </Grid>
            <Grid item>
              <Tooltip title="More">
                <IconButton
                  id="more-button"
                  aria-controls={open ? 'more-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickMoreMenu}
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
