import { useState, useRef, useEffect } from 'react'
import { Box } from '@mui/material'
import {
  atomIsDrawingActive,
  atomNoteType,
  atomIsModalOpen,
  atomNewNote,
  atomEditingID,
  atomNoteBeingEdited,
  atomViewportWidth,
  atomViewportHeight,
} from '../atoms'
import { useRecoilValue, useRecoilState } from 'recoil'
import DrawingMenu from './DrawingMenu'
import CanvasDraw from 'react-canvas-draw'
import { COLOR_OPTIONS, STROKE_OPTIONS } from '../Constants'

const DrawingContainer = () => {
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
  }>(COLOR_OPTIONS[0])
  /** Selected brush stroke size for drawing */
  const [selectedStroke, setSelectedStroke] = useState<number>(
    STROKE_OPTIONS[2]
  )
  /** Ref for the container around the drawing canvas */
  const drawingContainerRef = useRef<HTMLDivElement>(null)
  /** Ref for the drawing canvas */
  const [canvasRef, setCanvasRef] = useState<CanvasDraw>()

  /** Reset to the default colour and stroke when the drawing editor opens */
  useEffect(() => {
    setSelectedColor(COLOR_OPTIONS[0])
    setSelectedStroke(STROKE_OPTIONS[2])
  }, [isModalOpen])

  /** Save the drawing and close the drawing container */
  const handleBackClick = () => {
    if (editingID) {
      setNoteBeingEdited((prevNote) => {
        const editedNote = { ...prevNote }
        if (canvasRef) {
          editedNote.drawing = canvasRef.getSaveData()
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
          // @ts-ignore: Unreachable code error
          editedNote.drawingImage = canvasRef.getDataURL()
        }
        editedNote.userGoogleId = JSON.parse(
          window.localStorage.userProfile
        ).googleId
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
        ref={drawingContainerRef}
      >
        <DrawingMenu
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedStroke={selectedStroke}
          setSelectedStroke={setSelectedStroke}
          handleBackClick={handleBackClick}
          clearCanvas={clearCanvas}
        />
        <CanvasDraw
          ref={(canvasDraw) => {
            if (canvasDraw !== null) {
              setCanvasRef(canvasDraw)
            }
          }}
          canvasHeight={viewportHeight}
          canvasWidth={viewportWidth}
          brushColor={selectedColor.color}
          brushRadius={selectedStroke}
          style={{ cursor: 'pointer' }}
          saveData={editingID ? noteBeingEdited.drawing : newNote.drawing}
          immediateLoading
          hideGrid
        />
      </Box>
    )
  } else return null
}

export default DrawingContainer
