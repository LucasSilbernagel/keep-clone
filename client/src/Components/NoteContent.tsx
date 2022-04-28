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

interface IComponentProps {
  note: IExistingNote
  deleteNote: (id: string) => void
  getNotes: () => void
}

const NoteContent = (props: IComponentProps) => {
  const { note, deleteNote, getNotes } = props

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

  return (
    <Grid
      item
      key={note._id}
      sx={{
        width: {
          xs: '180px',
          sm: '250px',
        },
        maxWidth: {
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
                cursor: 'pointer',
                '& .moreButton': {
                  display: 'flex',
                },
              }
            : {
                paddingBottom: '2.5em',
                '&:hover, &:focus': {
                  boxShadow: 4,
                  cursor: 'pointer',
                  paddingBottom: 'unset',
                  '& .moreButton': {
                    display: 'flex',
                  },
                },
              }
        }
      >
        <Grid item container>
          <Grid item>
            <Typography
              sx={{
                maxHeight: '180px',
                padding: '1em 1.6em 1em 0.9em',
                overflow: 'hidden',
              }}
            >
              {note.text}
            </Typography>
          </Grid>
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
                <MenuItem onClick={() => copyNote(note)}>Make a copy</MenuItem>
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
        </Grid>
      </Paper>
    </Grid>
  )
}

export default NoteContent
