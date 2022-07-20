import { Grid, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRecoilValue } from 'recoil'
import React from 'react'
import { atomViewportWidth } from '../atoms'
import {
  FOURTH_COLOR_OPTIONS,
  SECOND_COLOR_OPTIONS,
  THIRD_COLOR_OPTIONS,
} from '../Constants'
import { IDrawingColor } from '../types'

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

/** Function to display a row of color button options */
const displayColorOptions = (
  color: IDrawingColor,
  index: number,
  updateColor: (color: IDrawingColor) => void,
  selectedColor: IDrawingColor
) => {
  return (
    <Grid item key={index}>
      <Tooltip title={color.label}>
        <ColorButton
          style={{
            backgroundColor: color.color,
            border: color.label === 'White' ? '1px solid #000000' : '',
            transform: color.label === selectedColor.label ? 'scale(1.3)' : '',
          }}
          onClick={() => updateColor(color)}
        ></ColorButton>
      </Tooltip>
    </Grid>
  )
}

interface MoreColorsProps {
  selectedColor: IDrawingColor
  showingMoreColors: boolean
  updateColor: (color: IDrawingColor) => void
}

const MoreColors: React.FC<MoreColorsProps> = (props: MoreColorsProps) => {
  const { selectedColor, showingMoreColors, updateColor } = props

  /** The width of the viewport, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  /** Function to calculate the width of the More Colours menu */
  const getMenuWidth = () => {
    let width = '81%'
    if (viewportWidth > 440) {
      width = '82%'
    }
    return width
  }

  if (showingMoreColors) {
    return (
      <>
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{ marginBottom: '0.8em', width: getMenuWidth() }}
        >
          {SECOND_COLOR_OPTIONS.map((color, index) => {
            return displayColorOptions(color, index, updateColor, selectedColor)
          })}
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{ marginBottom: '0.8em', width: getMenuWidth() }}
        >
          {THIRD_COLOR_OPTIONS.map((color, index) => {
            return displayColorOptions(color, index, updateColor, selectedColor)
          })}
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{ width: getMenuWidth() }}
        >
          {FOURTH_COLOR_OPTIONS.map((color, index) => {
            return displayColorOptions(color, index, updateColor, selectedColor)
          })}
        </Grid>
      </>
    )
  } else return null
}

export default MoreColors
