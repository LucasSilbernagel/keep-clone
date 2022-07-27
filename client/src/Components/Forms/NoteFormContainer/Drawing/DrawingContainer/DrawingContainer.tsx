import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CanvasDraw from 'lucas-silbernagel-react-canvas-draw'
import { useRecoilState, useRecoilValue } from 'recoil'
import FocusTrap from 'focus-trap-react'

import {
  atomEditingID,
  atomIsDrawingActive,
  atomIsModalOpen,
  atomNewNote,
  atomNoteBeingEdited,
  atomNoteType,
  atomViewportHeight,
  atomViewportWidth,
} from '../../../../../atoms'
import {
  FIRST_COLOR_OPTIONS,
  MAIN_BREAKPOINT,
  STROKE_OPTIONS,
} from '../../../../../Constants'
import DrawingMenu from '../DrawingMenu'
import MobileDrawingMenu from '../MobileDrawingMenu'

const DrawingContainer: React.FC = () => {
  /** The type of the note that is being created or edited */
  const noteType = useRecoilValue(atomNoteType)
  /** The width of the window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** The height of the window, in pixels */
  const viewportHeight = useRecoilValue(atomViewportHeight)
  /** The ID of the note that is being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** The note that is being edited */
  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)
  /** The new note */
  const [newNote, setNewNote] = useRecoilState(atomNewNote)
  /** Boolean to determine whether the drawing container is open */
  const [isDrawingActive, setIsDrawingActive] =
    useRecoilState(atomIsDrawingActive)
  /** Boolean to determine whether the modal is open */
  const [isModalOpen, setIsModalOpen] = useRecoilState(atomIsModalOpen)
  /** Selected colour for drawing */
  const [selectedColor, setSelectedColor] = useState<{
    label: string
    color: string
  }>(FIRST_COLOR_OPTIONS[0])
  /** Selected brush stroke size for drawing */
  const [selectedStroke, setSelectedStroke] = useState<number>(
    STROKE_OPTIONS[2]
  )
  /** Ref for the container around the drawing canvas */
  const drawingContainerRef = useRef<HTMLDivElement>(null)
  /** Ref for the drawing canvas */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [canvasRef, setCanvasRef] = useState<any>()

  /** Reset to the default colour and stroke when the drawing editor opens */
  useEffect(() => {
    setSelectedColor(FIRST_COLOR_OPTIONS[0])
    setSelectedStroke(STROKE_OPTIONS[2])
  }, [isModalOpen])

  /** Save the drawing and close the drawing container */
  const handleBackClick = () => {
    if (editingID) {
      setNoteBeingEdited((prevNote) => {
        const editedNote = { ...prevNote }
        if (canvasRef) {
          editedNote.drawing = canvasRef.getSaveData()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: Unreachable code error
          editedNote.drawingImage = canvasRef.getDataURL()
        }
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    } else {
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        if (canvasRef) {
          editedNote.drawing = canvasRef.getSaveData()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: Unreachable code error
          editedNote.drawingImage = canvasRef.getDataURL()
        }
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

  /** Function to clear the canvas */
  const clearCanvas = () => {
    if (canvasRef) {
      canvasRef.clear()
    }
  }

  /** Function to undo last drawing action */
  const undo = () => {
    if (canvasRef) {
      canvasRef.undo()
    }
  }

  if (noteType === 'drawing' && isDrawingActive) {
    return (
      <FocusTrap
        focusTrapOptions={{
          escapeDeactivates: false,
          fallbackFocus: '#drawing-container',
        }}
      >
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
          ref={drawingContainerRef}
          id="drawing-container"
          tabIndex={-1}
        >
          <DrawingMenu
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedStroke={selectedStroke}
            setSelectedStroke={setSelectedStroke}
            handleBackClick={handleBackClick}
            clearCanvas={clearCanvas}
            undo={undo}
          />
          <CanvasDraw
            ref={(canvasDraw: null) => {
              if (canvasDraw !== null) {
                setCanvasRef(canvasDraw)
              }
            }}
            canvasHeight={viewportHeight}
            canvasWidth={viewportWidth}
            brushColor={selectedColor.color}
            brushRadius={selectedStroke}
            style={{
              paddingBottom: viewportWidth <= MAIN_BREAKPOINT ? '8em' : '',
            }}
            saveData={editingID ? noteBeingEdited.drawing : newNote.drawing}
            immediateLoading
            hideGrid
            hideInterface={viewportWidth <= MAIN_BREAKPOINT}
            lazyRadius={0}
          />
          <MobileDrawingMenu
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedStroke={selectedStroke}
            setSelectedStroke={setSelectedStroke}
            clearCanvas={clearCanvas}
          />
        </Box>
      </FocusTrap>
    )
  } else return null
}

export default DrawingContainer
