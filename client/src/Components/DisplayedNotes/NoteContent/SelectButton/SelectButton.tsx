import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useRecoilState } from 'recoil'
import React from 'react'
import { atomSelectedNoteIds } from '../../../../atoms'
import { IExistingNote } from '../../../../types'

interface SelectButtonProps {
  note: IExistingNote
  defaultHidden?: boolean
}

const SelectButton: React.FC<SelectButtonProps> = (
  props: SelectButtonProps
) => {
  const { note, defaultHidden } = props

  /** State setter to update the array of selected note IDs */
  const [selectedNoteIds, setSelectedNoteIds] =
    useRecoilState(atomSelectedNoteIds)

  /** Function to select or deselect a note */
  const handleSelectNote = () => {
    if (selectedNoteIds.includes(note._id)) {
      setSelectedNoteIds(selectedNoteIds.filter((id) => id !== note._id))
    } else {
      setSelectedNoteIds([...selectedNoteIds, note._id])
    }
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: -22,
        left: -22,
        visibility: defaultHidden ? 'hidden' : 'unset',
      }}
      className="selectButton"
    >
      <Tooltip title="Select note">
        <span>
          <IconButton
            size="large"
            color="inherit"
            aria-label="select note"
            data-testid="select-note"
            onClick={handleSelectNote}
          >
            <CheckCircleIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default SelectButton
