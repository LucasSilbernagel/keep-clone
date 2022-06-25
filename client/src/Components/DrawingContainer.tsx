import { useState, useRef, useEffect } from 'react'
import { Box } from '@mui/material'
import {
  atomIsDrawingActive,
  atomNoteType,
  atomIsModalOpen,
  atomNewNote,
} from '../atoms'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import DrawingMenu from './DrawingMenu'
import CanvasDraw from 'react-canvas-draw'
import { COLOR_OPTIONS, STROKE_OPTIONS } from '../Constants'

const DrawingContainer = () => {
  /** The type of the note that is being created or edited */
  const noteType = useRecoilValue(atomNoteType)
  /** State setter to update the new note */
  const setNewNote = useSetRecoilState(atomNewNote)
  /** Boolean to determine whether the drawing container is open */
  const [isDrawingActive, setIsDrawingActive] =
    useRecoilState(atomIsDrawingActive)
  /** State setter to update whether the modal is open */
  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)
  /** Selected colour for drawing */
  const [selectedColor, setSelectedColor] = useState<{
    label: string
    color: string
  }>(COLOR_OPTIONS[0])
  /** Selected brush stroke size for drawing */
  const [selectedStroke, setSelectedStroke] = useState<number>(
    STROKE_OPTIONS[2]
  )
  /** Width of the container around the drawing canvas */
  const [containerWidth, setContainerWidth] = useState(1000)
  /** Height of the container around the drawing canvas */
  const [containerHeight, setContainerHeight] = useState(1000)
  /** Ref for the container around the drawing canvas */
  const drawingContainerRef = useRef<HTMLDivElement>(null)
  /** Ref for the drawing canvas */
  const [canvasRef, setCanvasRef] = useState<CanvasDraw>()

  /** Keep track of the height and width of the container around the drawing canvas */
  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setContainerWidth(event[0].contentBoxSize[0].inlineSize)
      setContainerHeight(event[0].contentBoxSize[0].blockSize)
    })
    if (drawingContainerRef.current !== null) {
      resizeObserver.observe(drawingContainerRef.current)
    }
  })

  /** Save the drawing and close the drawing container */
  const handleBackClick = () => {
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
    setIsDrawingActive(false)
    setIsModalOpen(true)
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
        />
        <CanvasDraw
          ref={(canvasDraw) => {
            if (canvasDraw !== null) {
              setCanvasRef(canvasDraw)
            }
          }}
          canvasHeight={containerHeight}
          canvasWidth={containerWidth}
          brushColor={selectedColor.color}
          brushRadius={selectedStroke}
          style={{ cursor: 'pointer' }}
        />
      </Box>
    )
  } else return null
}

export default DrawingContainer
