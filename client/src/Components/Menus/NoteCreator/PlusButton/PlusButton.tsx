import AddBoxIcon from '@mui/icons-material/AddBox'
import { Box, IconButton } from '@mui/material'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomIsDarkTheme,
  atomIsModalOpen,
  atomNoteType,
} from '../../../../atoms'

const PlusButton = (): JSX.Element => {
  /** State setter to open/close the modal */
  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)
  /** Whether or not the dark theme is being used */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** State setter to update the type of the note being created */
  const setNoteType = useSetRecoilState(atomNoteType)
  /** Function to open the modal */
  const openModal = () => setIsModalOpen(true)

  /** Function to create a new text note */
  const createTextNote = () => {
    setNoteType('text')
    openModal()
  }

  return (
    <IconButton
      aria-label="new note"
      color={isDarkTheme ? 'info' : 'primary'}
      sx={{ position: 'relative' }}
      onClick={createTextNote}
      data-testid="plus-button"
    >
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: 'red',
          zIndex: -20,
          top: '28px',
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: 'blue',
          zIndex: -20,
          right: '28px',
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: 'green',
          zIndex: -20,
          bottom: '28px',
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: 'yellow',
          zIndex: -20,
          left: '28px',
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: '#525355',
          zIndex: -25,
          left: '35px',
        }}
      ></Box>
      <AddBoxIcon sx={{ fontSize: '76px' }} />
    </IconButton>
  )
}

export default PlusButton
