import { AppBar, Box, Toolbar, IconButton, Tooltip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { atomIsDrawingActive } from '../atoms'
import { useSetRecoilState } from 'recoil'

const DrawingMenu = () => {
  /** State setter to update whether a drawing is being created or edited */
  const setIsDrawingActive = useSetRecoilState(atomIsDrawingActive)

  /** Save the drawing and close the drawing container */
  const handleBackClick = () => {
    setIsDrawingActive(false)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }}>
        <Toolbar>
          <Tooltip title="Back">
            <IconButton
              aria-label="back"
              color="info"
              onClick={handleBackClick}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default DrawingMenu
