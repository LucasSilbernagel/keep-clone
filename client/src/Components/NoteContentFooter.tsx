import { MouseEvent, Dispatch, SetStateAction } from 'react'
import { Grid, IconButton, Tooltip, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IExistingNote } from '../types'
import axios from 'axios'
import { atomViewportWidth, atomIsLoading, atomNotes } from '../atoms'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { getNotes } from '../LogicHelpers'
import { MAIN_BREAKPOINT } from '../Constants'

interface NoteContentFooterProps {
  note: IExistingNote
  deleteNote: (id: string) => void
  moreAnchorEl: HTMLElement | null
  setMoreAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
  isMoreMenuOpen: boolean
}

const NoteContentFooter = (props: NoteContentFooterProps) => {
  const { note, deleteNote, moreAnchorEl, setMoreAnchorEl, isMoreMenuOpen } =
    props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** Boolean that determines whether notes are loading from the back end */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)

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

  if (viewportWidth > MAIN_BREAKPOINT) {
    return (
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
            <MenuItem onClick={() => copyNote(note)}>Make a copy</MenuItem>
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
              sx={isMoreMenuOpen ? { display: 'flex' } : { display: 'none' }}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    )
  } else return null
}

export default NoteContentFooter
