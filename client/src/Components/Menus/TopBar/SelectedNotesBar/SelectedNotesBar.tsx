import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomIsDarkTheme,
  atomIsLoading,
  atomNotes,
  atomSelectedNoteIds,
} from '../../../../atoms'
import { getNotes } from '../../../../Logic/LogicHelpers'
import { IExistingNote } from '../../../../types'

interface SelectedNotesBarProps {
  editNotes: (editField: string, selectedNotes: IExistingNote[]) => void
}

const SelectedNotesBar = (props: SelectedNotesBarProps): JSX.Element => {
  const { editNotes } = props
  /** Boolean that determines whether the app is being viewed with the dark (or light) theme */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** State setter to update loading state */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const [notes, setNotes] = useRecoilState(atomNotes)
  /** Array of selected note IDs */
  const [selectedNoteIds, setSelectedNoteIds] =
    useRecoilState(atomSelectedNoteIds)

  /** Delete selected notes */
  const deleteNotes = (ids: string[]) => {
    ids.forEach((id: string) => {
      axios
        .delete(`${process.env.REACT_APP_API}/api/notes/${id}`)
        .then((res) => {
          if (res.data) {
            getNotes(setIsLoading, setNotes)
          }
        })
        .catch((err) => console.error(err))
    })
  }

  const getPinnedLabel = (notes: IExistingNote[]) => {
    return notes
      .filter((note) => selectedNoteIds.includes(note._id))
      .every((note) => note.isPinned)
      ? 'Unpin selection'
      : 'Pin selection'
  }

  return (
    <Box sx={{ flexGrow: 1, zIndex: 80 }}>
      <AppBar position="static">
        <Toolbar
          sx={
            isDarkTheme
              ? {
                  backgroundColor: '#202123',
                  borderBottom: '1px solid #525355',
                }
              : {}
          }
        >
          <Grid container justifyContent="space-between" sx={{ width: '100%' }}>
            <Grid item container xs={6} alignItems="center">
              <Grid item>
                <Tooltip title="Clear selection">
                  <span>
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="Clear selection"
                      onClick={() => setSelectedNoteIds([])}
                      data-testid="clear-selection-button"
                    >
                      <CloseIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography sx={{ ml: 2 }}>
                  {selectedNoteIds.length} selected
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={4}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item>
                <Tooltip title={getPinnedLabel(notes)}>
                  <span>
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label={getPinnedLabel(notes)}
                      onClick={() => {
                        editNotes(
                          'isPinned',
                          notes.filter((note) =>
                            selectedNoteIds.includes(note._id)
                          )
                        )
                        setSelectedNoteIds([])
                      }}
                      data-testid="pin-selection-button"
                    >
                      {notes
                        .filter((note) => selectedNoteIds.includes(note._id))
                        .every((note) => note.isPinned) ? (
                        <PushPinIcon />
                      ) : (
                        <PushPinOutlinedIcon />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Delete selection">
                  <span>
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="Delete selection"
                      onClick={() => deleteNotes(selectedNoteIds)}
                      data-testid="delete-selection-button"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default SelectedNotesBar
