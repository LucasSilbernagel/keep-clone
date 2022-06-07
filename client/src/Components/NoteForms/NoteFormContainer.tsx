import { ChangeEvent } from 'react'
import TextFormMobile from './TextForm/TextFormMobile'
import { useRecoilValue } from 'recoil'
import { atomViewportWidth, atomIsDarkTheme } from '../../atoms'
import { Box, Grid, Button } from '@mui/material'
import RenderNoteFormDesktop from '../RenderNoteForms/RenderNoteFormDesktop'
import { noteFormStyles } from '../../LogicHelpers'

interface IComponentProps {
  editingID: string
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  finishCreatingNote: () => void
  inModal: boolean
}

const NoteFormContainer = (props: IComponentProps) => {
  const {
    editingID,
    handleNoteTextChange,
    handleNoteTitleChange,
    finishCreatingNote,
    inModal,
  } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const isDarkTheme = useRecoilValue(atomIsDarkTheme)

  return (
    <Box sx={noteFormStyles(inModal, isDarkTheme)}>
      {viewportWidth > 1011 ? (
        <RenderNoteFormDesktop
          handleNoteTextChange={handleNoteTextChange}
          handleNoteTitleChange={handleNoteTitleChange}
          editingID={editingID}
        />
      ) : (
        <TextFormMobile
          handleNoteTextChange={handleNoteTextChange}
          handleNoteTitleChange={handleNoteTitleChange}
          editingID={editingID}
        />
      )}
      {!inModal && (
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
      )}
    </Box>
  )
}

export default NoteFormContainer
