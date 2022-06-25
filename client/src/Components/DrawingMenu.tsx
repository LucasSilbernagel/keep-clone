import { useState, MouseEvent } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Grid,
  Menu,
  MenuItem,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import BrushSharpIcon from '@mui/icons-material/BrushSharp'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  atomIsDrawingActive,
  atomIsModalOpen,
  atomNewNote,
  atomNoteBeingEdited,
  atomEditingID,
} from '../atoms'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { COLOR_OPTIONS, STROKE_OPTIONS } from '../Constants'
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

interface DrawingMenuProps {
  selectedColor: { label: string; color: string }
  setSelectedColor: (color: IDrawingColor) => void
  selectedStroke: number
  setSelectedStroke: (stroke: number) => void
  handleBackClick: () => void
}

const DrawingMenu = (props: DrawingMenuProps) => {
  const {
    selectedColor,
    setSelectedColor,
    selectedStroke,
    setSelectedStroke,
    handleBackClick,
  } = props
  /** State setter to update whether a drawing is being created or edited */
  const setIsDrawingActive = useSetRecoilState(atomIsDrawingActive)
  /** State setter to update whether the modal is open or not */
  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)
  /** State setter to update the note that is being edited */
  const setNoteBeingEdited = useSetRecoilState(atomNoteBeingEdited)
  /** State setter to update the new note */
  const setNewNote = useSetRecoilState(atomNewNote)
  /** The ID of the note that is being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** Anchor element for the "more" menu */
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null)
  /** Boolean that determines whether the "more" menu is open */
  const isMoreMenuOpen = Boolean(moreAnchorEl)
  /** Anchor element for the paintbrush menu */
  const [paintbrushAnchorEl, setPaintbrushAnchorEl] =
    useState<null | HTMLElement>(null)
  /** Boolean that determines whether the paintbrush menu is open */
  const isPaintbrushMenuOpen = Boolean(paintbrushAnchorEl)

  /** Close drawing container without saving drawing */
  const deleteCurrentDrawing = () => {
    if (editingID) {
      setNoteBeingEdited((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.drawing = ''
        editedNote.drawingImage = ''
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    } else {
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.drawing = ''
        editedNote.drawingImage = ''
        editedNote.userGoogleId = JSON.parse(
          window.localStorage.userProfile
        ).googleId
        return editedNote
      })
      setIsDrawingActive(false)
      setIsModalOpen(true)
    }
  }

  /** Function to open the "more" menu */
  const handleClickMoreMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreAnchorEl(event.currentTarget)
  }

  /** Function to close the "more" menu */
  const handleCloseMoreMenu = () => {
    setMoreAnchorEl(null)
  }

  /** Function to open the paintbrush menu */
  const openPaintbrushMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setPaintbrushAnchorEl(event.currentTarget)
  }

  /** Function to close the paintbrush menu */
  const closePaintbrushMenu = () => {
    setPaintbrushAnchorEl(null)
  }

  /** Function to update the selected colour */
  const updateColor = (color: { label: string; color: string }) => {
    setSelectedColor(color)
  }

  /** Function to update the selected brush stroke size */
  const updateStroke = (stroke: number) => {
    setSelectedStroke(stroke)
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '0.5em' }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }}>
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid
              item
              container
              xs={8}
              sm={4}
              md={2}
              justifyContent="space-between"
            >
              <Grid item>
                <Tooltip title="Back">
                  <IconButton
                    aria-label="back"
                    color="info"
                    onClick={handleBackClick}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Eraser">
                  <IconButton aria-label="eraser" color="info">
                    <AutoFixHighIcon />
                  </IconButton>
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
                      justifyContent="space-between"
                      sx={{ marginBottom: '1em', padding: '0em 0.5em' }}
                    >
                      {COLOR_OPTIONS.map((color, index) => {
                        return (
                          <Grid item key={index}>
                            <Tooltip title={color.label}>
                              <ColorButton
                                style={{
                                  backgroundColor: color.color,
                                  transform:
                                    color === selectedColor ? 'scale(1.3)' : '',
                                }}
                                onClick={() => updateColor(color)}
                              ></ColorButton>
                            </Tooltip>
                          </Grid>
                        )
                      })}
                    </Grid>
                    <Grid item container justifyContent="space-between">
                      {STROKE_OPTIONS.map((stroke, index) => {
                        return (
                          <Grid item key={index}>
                            <SizeButton
                              onClick={() => updateStroke(stroke)}
                              style={{
                                border:
                                  stroke === selectedStroke
                                    ? '1px solid #000000'
                                    : '',
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
                  <IconButton
                    id="paintbrush-button"
                    aria-controls={
                      isPaintbrushMenuOpen ? 'paintbrush-menu' : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={isPaintbrushMenuOpen ? 'true' : undefined}
                    onClick={openPaintbrushMenu}
                    color="info"
                  >
                    <BrushSharpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item container justifyContent="flex-end" xs={1}>
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
                <MenuItem onClick={deleteCurrentDrawing}>
                  Delete current drawing
                </MenuItem>
              </Menu>
              <Tooltip title="More">
                <IconButton
                  id="more-button"
                  aria-controls={isMoreMenuOpen ? 'more-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isMoreMenuOpen ? 'true' : undefined}
                  onClick={handleClickMoreMenu}
                  color="info"
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default DrawingMenu
