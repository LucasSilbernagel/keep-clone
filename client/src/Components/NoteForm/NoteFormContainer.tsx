import { ChangeEvent } from 'react'
import TextFormMobile from './TextFormMobile'
import { useRecoilValue } from 'recoil'
import { atomViewportWidth, atomIsDarkTheme } from '../../atoms'
import { IExistingNote } from '../../types'
import { Box, Grid, Button } from '@mui/material'
import RenderNoteFormDesktop from '../RenderNoteFormDesktop'

interface IComponentProps {
  noteBeingEdited: IExistingNote
  editingID: string
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  finishCreatingNote: () => void
}

const NoteFormContainer = (props: IComponentProps) => {
  const {
    noteBeingEdited,
    editingID,
    handleNoteTextChange,
    handleNoteTitleChange,
    finishCreatingNote,
  } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const isDarkTheme = useRecoilValue(atomIsDarkTheme)

  return (
    <Box
      sx={
        isDarkTheme
          ? {
              backgroundColor: '#202123',
              border: '1px solid #525355',
              borderRadius: '10px',
            }
          : {}
      }
    >
      {viewportWidth > 1011 ? (
        <RenderNoteFormDesktop
          handleNoteTextChange={handleNoteTextChange}
          handleNoteTitleChange={handleNoteTitleChange}
          noteBeingEdited={noteBeingEdited}
          editingID={editingID}
        />
      ) : (
        <TextFormMobile
          handleNoteTextChange={handleNoteTextChange}
          handleNoteTitleChange={handleNoteTitleChange}
          noteBeingEdited={noteBeingEdited}
          editingID={editingID}
        />
      )}
      <Grid
        item
        container
        xs={12}
        justifyContent="flex-end"
        sx={{ paddingBottom: '0.5em', paddingRight: '1em' }}
      >
        <Button
          onClick={finishCreatingNote}
          color="inherit"
          sx={{ textTransform: 'initial', fontWeight: 'bold' }}
        >
          Close
        </Button>
      </Grid>
    </Box>
  )
}

export default NoteFormContainer
