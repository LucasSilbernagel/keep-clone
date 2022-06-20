import { useState, MouseEvent } from 'react'
import {
  Grid,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  Menu,
  MenuItem,
  useTheme,
  List,
  ListItem,
  Checkbox,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IExistingNote } from '../types'
import axios from 'axios'
import {
  atomIsModalOpen,
  atomViewportWidth,
  atomIsGridView,
  atomIsDarkTheme,
  atomIsLoading,
  atomNotes,
  atomEditingID,
  atomNoteBeingEdited,
  atomFilteredNotes,
} from '../atoms'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { noteContentStyles, getNotes } from '../LogicHelpers'
import CompletedListSummary from './CompletedListSummary'
import { BLANK_EXISTING_NOTE } from '../Constants'

interface NoteContentProps {
  note: IExistingNote
  deleteNote: (id: string) => void
}

const NoteContent = (props: NoteContentProps) => {
  const { note, deleteNote } = props

  /** The application theme */
  const theme = useTheme()
  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** State setter to update the modal open/closed state */
  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)
  /** Boolean that determines notes are displayed in a grid (or list) */
  const isGridView = useRecoilValue(atomIsGridView)
  /** Boolean that determines whether the dark theme (or light theme) is being used */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** Boolean that determines whether notes are loading from the back end */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** State setter to save the ID of the note that is being edited */
  const setEditingID = useSetRecoilState(atomEditingID)
  /** State setter to update which note that is being edited */
  const setNoteBeingEdited = useSetRecoilState(atomNoteBeingEdited)
  /** The notes array, filtered */
  const filteredNotes = useRecoilValue(atomFilteredNotes)
  /** Anchor element for the "more" menu */
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null)
  /** Boolean that determines whether the "more" menu is open */
  const isMoreMenuOpen = Boolean(moreAnchorEl)

  /** Function to open the "more" menu */
  const handleClickMoreMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreAnchorEl(event.currentTarget)
  }

  /** Function to close the "more" menu */
  const handleCloseMoreMenu = () => {
    setMoreAnchorEl(null)
  }

  /** Function to copy a note */
  const copyNote = (note: IExistingNote) => {
    setMoreAnchorEl(null)
    const newNote = {
      text: note.text,
      title: note.title,
      list: note.list,
      userGoogleId: note.userGoogleId,
      lastEdited: Date.now(),
    }
    axios
      .post('/api/notes', newNote)
      .then((res) => {
        if (res.data) {
          getNotes(setIsLoading, setNotes)
        }
      })
      .catch((err) => console.error(err))
  }

  /** Edit a note with a specific ID */
  const editNote = (id: string) => {
    setEditingID(id)
    setNoteBeingEdited(
      filteredNotes.find((note) => note._id === id) ?? BLANK_EXISTING_NOTE
    )
    setIsModalOpen(true)
  }

  return (
    <Grid
      item
      key={note._id}
      sx={
        isGridView
          ? {
              width: {
                xs: '180px',
                sm: '250px',
              },
            }
          : {
              width: '100%',
              marginBottom: '1em',
            }
      }
    >
      <Paper
        tabIndex={0}
        elevation={2}
        sx={noteContentStyles(
          isMoreMenuOpen,
          isDarkTheme,
          theme,
          viewportWidth
        )}
      >
        <Grid item container>
          <Grid item xs={12}>
            <button
              style={
                isDarkTheme
                  ? {
                      background: 'inherit',
                      border: 'none',
                      textAlign: 'left',
                      paddingBottom: viewportWidth < 1011 ? '1em' : 'unset',
                      width: '100%',
                      color: '#FFFFFF',
                    }
                  : {
                      background: 'inherit',
                      border: 'none',
                      textAlign: 'left',
                      paddingBottom: viewportWidth < 1011 ? '1em' : 'unset',
                      width: '100%',
                    }
              }
              onClick={() => editNote(note._id)}
            >
              {note.title && (
                <Typography
                  sx={{
                    maxHeight: '180px',
                    padding: '1em 1.6em 0 0.9em',
                    overflow: 'hidden',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    fontWeight: 'bold',
                  }}
                >
                  {note.title}
                </Typography>
              )}
              {note.text && (
                <Typography
                  sx={{
                    maxHeight: '180px',
                    padding: '1em 1.6em 0 0.9em',
                    overflow: 'hidden',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  {note.text}
                </Typography>
              )}
              {note.list.some((item) => item.text.length > 0) && (
                <>
                  <List sx={{ width: '100%', paddingBottom: 0 }} dense>
                    {note.list
                      .filter((item) => !item.done && item.text.length > 0)
                      .map((item) => {
                        return (
                          <ListItem key={item.id}>
                            <Grid container justifyContent="space-between">
                              <Grid
                                item
                                container
                                alignContent="center"
                                justifyContent="center"
                                xs={1}
                              >
                                <Grid item>
                                  <Checkbox checked={item.done} disabled />
                                </Grid>
                              </Grid>
                              <Grid item container xs={10} alignItems="center">
                                <Grid item xs={12}>
                                  <Typography
                                    noWrap
                                    sx={{
                                      fontSize: '0.9rem',
                                    }}
                                  >
                                    {item.text}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </ListItem>
                        )
                      })}
                  </List>
                  {note.list.filter((item) => item.done && item.text.length > 0)
                    .length > 0 && <CompletedListSummary note={note} />}
                </>
              )}
            </button>
          </Grid>
          {viewportWidth > 1011 ? (
            <Grid item container justifyContent="flex-end">
              <Grid item>
                <Menu
                  id="more-menu"
                  anchorEl={moreAnchorEl}
                  open={isMoreMenuOpen}
                  onClose={handleCloseMoreMenu}
                  MenuListProps={{
                    'aria-labelledby': 'more-button',
                  }}
                >
                  <MenuItem onClick={() => deleteNote(note._id)}>
                    Delete note
                  </MenuItem>
                  <MenuItem onClick={() => copyNote(note)}>
                    Make a copy
                  </MenuItem>
                </Menu>
                <Tooltip title="More">
                  <IconButton
                    id="more-button"
                    aria-controls={isMoreMenuOpen ? 'more-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMoreMenuOpen ? 'true' : undefined}
                    onClick={handleClickMoreMenu}
                    color="inherit"
                    className="moreButton"
                    sx={
                      isMoreMenuOpen ? { display: 'flex' } : { display: 'none' }
                    }
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    </Grid>
  )
}

export default NoteContent
