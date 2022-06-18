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

interface IComponentProps {
  note: IExistingNote
  deleteNote: (id: string) => void
}

const NoteContent = (props: IComponentProps) => {
  const { note, deleteNote } = props

  const theme = useTheme()

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)

  const isGridView = useRecoilValue(atomIsGridView)

  const isDarkTheme = useRecoilValue(atomIsDarkTheme)

  const setIsLoading = useSetRecoilState(atomIsLoading)

  const setNotes = useSetRecoilState(atomNotes)

  const setEditingID = useSetRecoilState(atomEditingID)

  const setNoteBeingEdited = useSetRecoilState(atomNoteBeingEdited)

  const filteredNotes = useRecoilValue(atomFilteredNotes)

  /** Anchor for the "more" menu */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClickMore = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const copyNote = (note: IExistingNote) => {
    setAnchorEl(null)
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
        sx={noteContentStyles(open, isDarkTheme, theme, viewportWidth)}
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
                  <MenuItem onClick={() => copyNote(note)}>
                    Make a copy
                  </MenuItem>
                </Menu>
                <Tooltip title="More">
                  <IconButton
                    id="more-button"
                    aria-controls={open ? 'more-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickMore}
                    color="inherit"
                    className="moreButton"
                    sx={open ? { display: 'flex' } : { display: 'none' }}
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
