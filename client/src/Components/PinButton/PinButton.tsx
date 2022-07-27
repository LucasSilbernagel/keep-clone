import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import React from 'react'

import {
  atomIsLoading,
  atomNewNote,
  atomNoteBeingEdited,
  atomNotes,
  atomSelectedNoteIds,
} from '../../atoms'
import { pushNoteEdit } from '../../Logic/LogicHelpers'
import { IExistingNote } from '../../types'

interface PinButtonProps {
  className?: string
  rightAlignment: number
  topAlignment: number
  zIndex?: number
  note?: IExistingNote
  isAlreadySaved: boolean
  defaultHidden?: boolean
}

const PinButton: React.FC<PinButtonProps> = (props: PinButtonProps) => {
  const {
    className,
    rightAlignment,
    topAlignment,
    zIndex,
    note,
    isAlreadySaved,
    defaultHidden,
  } = props

  /** The note being edited */
  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)
  /** The new note */
  const [newNote, setNewNote] = useRecoilState(atomNewNote)
  /** State setter to update the application loading state */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** Array of selected note IDs */
  const selectedNoteIds = useRecoilValue(atomSelectedNoteIds)

  /** Function to pin or unpin a note */
  const handlePinNote = () => {
    if (isAlreadySaved && note) {
      pushNoteEdit(
        { ...note, isPinned: !note.isPinned },
        setIsLoading,
        setNotes
      )
    } else if (!isAlreadySaved && note) {
      setNoteBeingEdited((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.isPinned = !noteBeingEdited.isPinned
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    } else if (!isAlreadySaved && !note) {
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.isPinned = !newNote.isPinned
        editedNote.userGoogleId = JSON.parse(
          window.localStorage.userProfile
        ).googleId
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    }
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        right: rightAlignment,
        top: topAlignment,
        visibility: defaultHidden ? 'hidden' : 'unset',
        zIndex: zIndex,
      }}
      className={className}
    >
      {(note && note.isPinned) || (!note && newNote.isPinned) ? (
        <Tooltip title="Unpin">
          <IconButton
            size="large"
            color="inherit"
            aria-label="unpin"
            onClick={handlePinNote}
            disabled={selectedNoteIds.length > 0}
            data-testid="pin-button"
          >
            <PushPinIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Pin">
          <IconButton
            size="large"
            color="inherit"
            aria-label="pin"
            onClick={handlePinNote}
            disabled={selectedNoteIds.length > 0}
            data-testid="pin-button"
          >
            <PushPinOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export default PinButton
