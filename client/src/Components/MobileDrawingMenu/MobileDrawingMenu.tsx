import { AppBar, Box, Grid, Toolbar } from '@mui/material'
import { useRecoilValue } from 'recoil'
import React from 'react'
import { atomViewportWidth } from '../../atoms'
import { MAIN_BREAKPOINT } from '../../Constants'
import { IDrawingColor } from '../../types'
import DrawingTools from '../DrawingTools'

interface MobileDrawingMenuProps {
  selectedColor: { label: string; color: string }
  setSelectedColor: (color: IDrawingColor) => void
  selectedStroke: number
  setSelectedStroke: (stroke: number) => void
  clearCanvas: () => void
}

const MobileDrawingMenu: React.FC<MobileDrawingMenuProps> = (
  props: MobileDrawingMenuProps
) => {
  const {
    selectedColor,
    setSelectedColor,
    selectedStroke,
    setSelectedStroke,
    clearCanvas,
  } = props
  /** The width of the window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  if (viewportWidth <= MAIN_BREAKPOINT) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }}>
          <Toolbar>
            <Grid container justifyContent="space-between">
              <Grid item container xs={12} justifyContent="space-evenly">
                <DrawingTools
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedStroke={selectedStroke}
                  setSelectedStroke={setSelectedStroke}
                  clearCanvas={clearCanvas}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    )
  } else return null
}

export default MobileDrawingMenu
