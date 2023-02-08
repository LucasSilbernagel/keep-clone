import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import BrushSharpIcon from '@mui/icons-material/BrushSharp'
import ClearIcon from '@mui/icons-material/Clear'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Grid, IconButton, Menu, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { MouseEvent, useState } from 'react'

import { FIRST_COLOR_OPTIONS, STROKE_OPTIONS } from '../../../../../Constants'
import { IDrawingColor } from '../../../../../types'
import MoreColors from '../MoreColors'

/** Color button */
const ColorButton = styled('button')(() => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  transition: 'all .2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.3)',
  },
  '&:focus': {
    transform: 'scale(1.3)',
  },
}))

/** Size button */
const SizeButton = styled('button')(() => ({
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  '&:hover': {
    border: '1px solid #000000',
  },
  '&:focus': {
    border: '1px solid #000000',
  },
}))

interface DrawingToolsProps {
  selectedColor: IDrawingColor
  setSelectedColor: (color: IDrawingColor) => void
  selectedStroke: number
  setSelectedStroke: (stroke: number) => void
  clearCanvas: () => void
}

const DrawingTools: React.FC<DrawingToolsProps> = (
  props: DrawingToolsProps
) => {
  const {
    selectedColor,
    setSelectedColor,
    selectedStroke,
    setSelectedStroke,
    clearCanvas,
  } = props
  /** The drawing tool that is being used */
  const [toolType, setToolType] = useState<'paintbrush' | 'eraser'>(
    'paintbrush'
  )
  /** Anchor element for the paintbrush menu */
  const [paintbrushAnchorEl, setPaintbrushAnchorEl] =
    useState<null | HTMLElement>(null)
  /** Whether or not the additional colours menu is visible */
  const [showingMoreColors, setShowingMoreColors] = useState<boolean>(false)
  /** Boolean that determines whether the paintbrush menu is open */
  const isPaintbrushMenuOpen = Boolean(paintbrushAnchorEl)

  /** Function to open the paintbrush menu */
  const openPaintbrushMenu = (event: MouseEvent<HTMLButtonElement>) => {
    if (selectedColor.label === 'White') {
      setSelectedColor({ label: 'Black', color: '#000000' })
    }
    setPaintbrushAnchorEl(event.currentTarget)
    setToolType('paintbrush')
  }

  /** Function to close the paintbrush menu */
  const closePaintbrushMenu = () => {
    setPaintbrushAnchorEl(null)
  }

  /** Function to update the selected colour */
  const updateColor = (color: IDrawingColor) => {
    setSelectedColor(color)
  }

  /** Function to update the selected brush stroke size */
  const updateStroke = (stroke: number) => {
    setSelectedStroke(stroke)
  }

  /** Function to use the eraser tool */
  const useEraser = () => {
    updateColor({ label: 'White', color: '#FFFFFF' })
    setToolType('eraser')
  }

  return (
    <>
      <Grid item>
        <Tooltip title="Clear Page">
          <span>
            <IconButton
              aria-label="clear page"
              color="info"
              onClick={clearCanvas}
              data-testid="clear-page-button"
            >
              <ClearIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Eraser">
          <span>
            <IconButton
              aria-label="eraser"
              color="info"
              onClick={useEraser}
              sx={{
                border: toolType === 'eraser' ? '1px solid #000000' : '',
              }}
              data-testid="eraser-button"
            >
              <AutoFixHighIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
      <Grid item>
        <Menu
          id="paintbrush-menu"
          anchorEl={paintbrushAnchorEl}
          open={isPaintbrushMenuOpen}
          onClose={closePaintbrushMenu}
          MenuListProps={{
            'aria-labelledby': 'paintbrush-button',
            disablePadding: true,
            style: { backgroundColor: '#FFFFFF', padding: '0.5em' },
          }}
        >
          <Grid container>
            <Grid
              item
              container
              direction="column"
              sx={{ marginBottom: '1em', padding: '0em 0.5em' }}
            >
              <Grid item container justifyContent="space-between">
                {FIRST_COLOR_OPTIONS.map((color, index) => {
                  return (
                    <Grid item key={index}>
                      <Tooltip title={color.label}>
                        <ColorButton
                          style={{
                            backgroundColor: color.color,
                            transform:
                              color.label === selectedColor.label
                                ? 'scale(1.3)'
                                : '',
                          }}
                          onClick={() => updateColor(color)}
                        ></ColorButton>
                      </Tooltip>
                    </Grid>
                  )
                })}
                <Tooltip
                  title={
                    showingMoreColors ? 'Hide More Colours' : 'More Colours'
                  }
                >
                  <span>
                    <IconButton
                      onClick={() => setShowingMoreColors(!showingMoreColors)}
                      aria-label={
                        showingMoreColors ? 'hide more colours' : 'more colours'
                      }
                      color="info"
                    >
                      {showingMoreColors ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
              <MoreColors
                selectedColor={selectedColor}
                showingMoreColors={showingMoreColors}
                updateColor={updateColor}
              />
            </Grid>
            <Grid item container justifyContent="space-between">
              {STROKE_OPTIONS.map((stroke, index) => {
                return (
                  <Grid item key={index}>
                    <SizeButton
                      onClick={() => updateStroke(stroke)}
                      style={{
                        border:
                          stroke === selectedStroke ? '1px solid #000000' : '',
                      }}
                    >
                      <div
                        style={{
                          width: stroke,
                          minWidth: stroke,
                          height: stroke,
                          minHeight: stroke,
                          backgroundColor: '#000000',
                          borderRadius: '50%',
                        }}
                      ></div>
                    </SizeButton>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Menu>
        <Tooltip title="Paintbrush">
          <span>
            <IconButton
              id="paintbrush-button"
              data-testid="paintbrush-button"
              aria-controls={
                isPaintbrushMenuOpen ? 'paintbrush-menu' : undefined
              }
              aria-haspopup="true"
              aria-expanded={isPaintbrushMenuOpen ? 'true' : undefined}
              onClick={openPaintbrushMenu}
              color="info"
              sx={{
                border: toolType === 'paintbrush' ? '1px solid #000000' : '',
              }}
            >
              <BrushSharpIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
    </>
  )
}

export default DrawingTools
