import { useState } from 'react'
import { Grid, Typography, Paper, useTheme, Box } from '@mui/material'
import { IExistingNote } from '../types'
import {
  atomIsModalOpen,
  atomViewportWidth,
  atomIsGridView,
  atomIsDarkTheme,
  atomEditingID,
  atomNoteBeingEdited,
  atomFilteredNotes,
  atomIsLoading,
  atomNotes,
} from '../atoms'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { noteContentStyles, pushNoteEdit } from '../LogicHelpers'
import { BLANK_EXISTING_NOTE, MAIN_BREAKPOINT } from '../Constants'
import NoteContentChecklist from './NoteContentChecklist'
import NoteContentFooter from './NoteContentFooter'
import PinButton from './PinButton'
import SelectButton from './SelectButton'

interface NoteContentProps {
  note: IExistingNote
  deleteNote: (id: string) => void
}

const NoteContent = (props: NoteContentProps) => {
  const { note, deleteNote } = props

  /** The application theme */
  const theme = useTheme()
  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** State setter to update the modal open/closed state */
  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)
  /** Boolean that determines notes are displayed in a grid (or list) */
  const isGridView = useRecoilValue(atomIsGridView)
  /** Boolean that determines whether the dark theme (or light theme) is being used */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** State setter to save the ID of the note that is being edited */
  const setEditingID = useSetRecoilState(atomEditingID)
  /** State setter to update which note that is being edited */
  const setNoteBeingEdited = useSetRecoilState(atomNoteBeingEdited)
  /** The notes array, filtered */
  const filteredNotes = useRecoilValue(atomFilteredNotes)
  /** State setter to update the application loading state */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** Anchor element for the "more" menu */
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null)
  /** Boolean that determines whether the "more" menu is open */
  const isMoreMenuOpen = Boolean(moreAnchorEl)

  /** Edit a note with a specific ID */
  const editNote = (id: string) => {
    setEditingID(id)
    setNoteBeingEdited(
      filteredNotes.find((note) => note._id === id) ?? BLANK_EXISTING_NOTE
    )
    setIsModalOpen(true)
  }

  /** Trigger time to detect the difference between a click and a long press */
  let triggerTime: number

  return (
    <Grid
      item
      key={note._id}
      sx={
        isGridView
          ? {
              width: {
                xs: '180px',
                sm: '250px',
              },
            }
          : {
              width: '100%',
              marginBottom: '1em',
            }
      }
    >
      <Paper
        tabIndex={0}
        elevation={2}
        sx={noteContentStyles(isMoreMenuOpen, isDarkTheme, theme, note)}
      >
        {viewportWidth > MAIN_BREAKPOINT && (
          <>
            <SelectButton
              note={note}
              isAlreadySaved={true}
              defaultHidden={true}
            />
            <PinButton
              className="pinButton"
              rightAlignment={-10}
              topAlignment={-5}
              note={note}
              isAlreadySaved={true}
              defaultHidden={true}
            />
          </>
        )}
        <Grid item container>
          <Grid item xs={12}>
            <button
              style={
                isDarkTheme
                  ? {
                      background: 'inherit',
                      border: 'none',
                      textAlign: 'left',
                      paddingBottom:
                        viewportWidth < MAIN_BREAKPOINT ? '1em' : 'unset',
                      width: '100%',
                      color: '#FFFFFF',
                    }
                  : {
                      background: 'inherit',
                      border: 'none',
                      textAlign: 'left',
                      paddingBottom:
                        viewportWidth < MAIN_BREAKPOINT ? '1em' : 'unset',
                      width: '100%',
                    }
              }
              onClick={() => {
                if (triggerTime > 400) {
                  /** Long press */
                  pushNoteEdit(
                    { ...note, isSelected: !note.isSelected },
                    setIsLoading,
                    setNotes
                  )
                } else {
                  /** Normal click */
                  editNote(note._id)
                  if (note.isSelected) {
                    setNoteBeingEdited((prevNote) => {
                      const editedNote = { ...prevNote }
                      editedNote.isSelected = false
                      return editedNote
                    })
                  }
                }
              }}
              onMouseDown={() => {
                triggerTime = new Date().getTime()
              }}
              onMouseUp={() => {
                let thisMoment = new Date().getTime()
                triggerTime = thisMoment - triggerTime
              }}
            >
              {note.title && (
                <Typography
                  sx={{
                    maxHeight: '180px',
                    padding: '1em 1.6em 0 0.9em',
                    overflow: 'hidden',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    fontWeight: 'bold',
                  }}
                >
                  {note.title}
                </Typography>
              )}
              {note.text && (
                <Typography
                  sx={{
                    maxHeight: '180px',
                    padding: '1em 1.6em 0 0.9em',
                    overflow: 'hidden',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  {note.text}
                </Typography>
              )}
              {note.list.some((item) => item.text.length > 0) && (
                <NoteContentChecklist note={note} />
              )}
              {note.drawingImage.length > 0 && (
                <Box sx={{ backgroundColor: '#FFFFFF', marginTop: '0.5em' }}>
                  <img
                    src={note.drawingImage}
                    alt="my drawing"
                    style={{ width: '100%', display: 'block' }}
                  />
                </Box>
              )}
              {note.recording.length > 0 && (
                <Grid item container direction="column">
                  <Grid item>
                    <audio
                      style={{
                        display: 'block',
                        width: '100%',
                        pointerEvents: 'none',
                        margin: '0.5em 0em',
                      }}
                      src={note.recording}
                      controls
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '1.5rem',
                        textAlign: 'center',
                      }}
                    >
                      {note.recordingDuration}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {note.image.length > 0 && (
                <Box sx={{ backgroundColor: '#FFFFFF', marginTop: '0.5em' }}>
                  <img
                    src={note.image}
                    alt="my upload"
                    style={{ width: '100%', display: 'block' }}
                  />
                </Box>
              )}
            </button>
          </Grid>
          <NoteContentFooter
            note={note}
            deleteNote={deleteNote}
            moreAnchorEl={moreAnchorEl}
            setMoreAnchorEl={setMoreAnchorEl}
            isMoreMenuOpen={isMoreMenuOpen}
          />
        </Grid>
      </Paper>
    </Grid>
  )
}

export default NoteContent
