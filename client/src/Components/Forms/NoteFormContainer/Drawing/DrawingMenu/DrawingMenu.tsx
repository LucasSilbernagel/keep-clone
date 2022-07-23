import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UndoIcon from '@mui/icons-material/Undo'
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from '@mui/material'
import React, { MouseEvent, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomEditingID,
  atomIsDrawingActive,
  atomIsModalOpen,
  atomNewNote,
  atomNoteBeingEdited,
  atomViewportWidth,
} from '../../../../../atoms'
import { MAIN_BREAKPOINT } from '../../../../../Constants'
import { IDrawingColor } from '../../../../../types'
import DrawingTools from '../DrawingTools'

interface DrawingMenuProps {
  selectedColor: { label: string; color: string }
  setSelectedColor: (color: IDrawingColor) => void
  selectedStroke: number
  setSelectedStroke: (stroke: number) => void
  handleBackClick: () => void
  clearCanvas: () => void
  undo: () => void
}

const DrawingMenu: React.FC<DrawingMenuProps> = (props: DrawingMenuProps) => {
  const {
    selectedColor,
    setSelectedColor,
    selectedStroke,
    setSelectedStroke,
    handleBackClick,
    clearCanvas,
    undo,
  } = props
  /** State setter to update whether a drawing is being created or edited */
  const setIsDrawingActive = useSetRecoilState(atomIsDrawingActive)
  /** State setter to update whether the modal is open or not */
  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)
  /** The width of the window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
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
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    }
    setIsDrawingActive(false)
    setIsModalOpen(true)
  }

  /** Function to open the "more" menu */
  const handleClickMoreMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreAnchorEl(event.currentTarget)
  }

  /** Function to close the "more" menu */
  const handleCloseMoreMenu = () => {
    setMoreAnchorEl(null)
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
              md={3}
              justifyContent="space-between"
            >
              <Grid item>
                <Tooltip title="Back">
                  <IconButton
                    aria-label="back"
                    color="info"
                    onClick={handleBackClick}
                    data-testid="back-button"
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              {viewportWidth > MAIN_BREAKPOINT && (
                <DrawingTools
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedStroke={selectedStroke}
                  setSelectedStroke={setSelectedStroke}
                  clearCanvas={clearCanvas}
                />
              )}
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              xs={4}
              sm={2}
              lg={1}
            >
              <Tooltip title="Undo">
                <IconButton onClick={undo} color="info">
                  <UndoIcon />
                </IconButton>
              </Tooltip>
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
