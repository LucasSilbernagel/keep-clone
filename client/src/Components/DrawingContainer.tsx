import { Box } from '@mui/material'
import { atomIsDrawingActive, atomNoteType } from '../atoms'
import { useRecoilValue } from 'recoil'
import DrawingMenu from './DrawingMenu'

const DrawingContainer = () => {
  /** The type of the note that is being created or edited */
  const noteType = useRecoilValue(atomNoteType)
  /** Boolean to determine whether the drawing container is open */
  const isDrawingActive = useRecoilValue(atomIsDrawingActive)
  if (noteType === 'drawing' && isDrawingActive) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          zIndex: 30,
        }}
      >
        <DrawingMenu />
      </Box>
    )
  } else return null
}

export default DrawingContainer
