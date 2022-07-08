import { Box, IconButton, Tooltip } from '@mui/material'
import { atomIsLoading, atomNotes } from '../atoms'
import { useSetRecoilState } from 'recoil'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { IExistingNote } from '../types'
import { pushNoteEdit } from '../LogicHelpers'

interface SelectButtonProps {
  note?: IExistingNote
  isAlreadySaved: boolean
  defaultHidden?: boolean
}

const SelectButton = (props: SelectButtonProps) => {
  const { note, isAlreadySaved, defaultHidden } = props

  /** State setter to update the application loading state */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)

  /** Function to select or deselect a note */
  const handleSelectNote = () => {
    if (isAlreadySaved && note) {
      pushNoteEdit(
        { ...note, isSelected: !note.isSelected },
        setIsLoading,
        setNotes
      )
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
        <IconButton
          size="large"
          color="inherit"
          aria-label="select note"
          onClick={handleSelectNote}
        >
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default SelectButton
