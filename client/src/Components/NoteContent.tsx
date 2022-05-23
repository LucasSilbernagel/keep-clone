import { useState, MouseEvent } from 'react'
import {
  Grid,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IExistingNote } from '../Interfaces'
import axios from 'axios'
import { atomIsModalOpen, atomViewportWidth } from '../atoms'
import { useSetRecoilState, useRecoilValue } from 'recoil'

interface IComponentProps {
  note: IExistingNote
  getNotes: () => void
  editNote: (id: string) => void
}

const NoteContent = (props: IComponentProps) => {
  const { note, getNotes, editNote } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)

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
    const newNote = { text: note.text, userGoogleId: note.userGoogleId }
    axios
      .post('/api/notes', newNote)
      .then((res) => {
        if (res.data) {
          getNotes()
        }
      })
      .catch((err) => console.error(err))
  }

  /** Delete a note with a specific ID */
  const deleteNote = (id: string) => {
    axios
      .delete(`/api/notes/${id}`)
      .then((res) => {
        if (res.data) {
          getNotes()
        }
      })
      .catch((err) => console.error(err))
  }

  const startEditingNote = (id: string) => {
    editNote(id)
    setIsModalOpen(true)
  }

  return (
    <Grid
      item
      key={note._id}
      sx={{
        width: {
          xs: '180px',
          sm: '250px',
        },
      }}
    >
      <Paper
        tabIndex={0}
        elevation={2}
        sx={
          open
            ? {
                boxShadow: 4,
                paddingBottom: 'unset',
                '& .moreButton': {
                  display: 'flex',
                },
                zIndex: 0,
              }
            : {
                paddingBottom: viewportWidth > 1011 ? '2.5em' : 'unset',
                '&:hover, &:focus': {
                  boxShadow: 4,
                  paddingBottom: 'unset',
                  '& .moreButton': {
                    display: 'flex',
                  },
                },
                zIndex: 0,
              }
        }
      >
        <Grid item container>
          <Grid item xs={12}>
            <button
              style={{
                background: 'inherit',
                border: 'none',
                textAlign: 'left',
                paddingBottom: viewportWidth < 1011 ? '1em' : 'unset',
                width: '100%',
              }}
              onClick={() => startEditingNote(note._id)}
            >
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
