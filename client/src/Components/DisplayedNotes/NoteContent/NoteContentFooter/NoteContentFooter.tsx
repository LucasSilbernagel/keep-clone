import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { Dispatch, MouseEvent, SetStateAction } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomIsLoading,
  atomNotes,
  atomSelectedNoteIds,
  atomViewportWidth,
} from '../../../../atoms'
import { MAIN_BREAKPOINT } from '../../../../Constants'
import { getNotes } from '../../../../LogicHelpers'
import { IExistingNote, INewNote } from '../../../../types'

interface NoteContentFooterProps {
  note: IExistingNote
  deleteNote: (id: string) => void
  moreAnchorEl: HTMLElement | null
  setMoreAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
  isMoreMenuOpen: boolean
}

const NoteContentFooter: React.FC<NoteContentFooterProps> = (
  props: NoteContentFooterProps
) => {
  const { note, deleteNote, moreAnchorEl, setMoreAnchorEl, isMoreMenuOpen } =
    props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** Boolean that determines whether notes are loading from the back end */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** Array of selected note IDs */
  const selectedNoteIds = useRecoilValue(atomSelectedNoteIds)

  /** Function to open the "more" menu */
  const handleClickMoreMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreAnchorEl(event.currentTarget)
  }

  /** Function to close the "more" menu */
  const handleCloseMoreMenu = () => {
    setMoreAnchorEl(null)
  }

  /** Function to copy a note */
  const copyNote = (selectedNote: IExistingNote | INewNote) => {
    setMoreAnchorEl(null)
    const newNote = {
      text: selectedNote.text,
      title: selectedNote.title,
      list: selectedNote.list,
      drawing: selectedNote.drawing,
      drawingImage: selectedNote.drawingImage,
      recording: selectedNote.recording,
      recordingDuration: selectedNote.recordingDuration,
      image: selectedNote.image,
      isPinned: selectedNote.isPinned,
      userGoogleId: selectedNote.userGoogleId,
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
              disablePadding: true,
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
              disabled={selectedNoteIds.length > 0}
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
