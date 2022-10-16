import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
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

interface SelectedNotesBarProps {
  editNotes: (editField: string, ids: string[]) => void
}

const SelectedNotesBar = (props: SelectedNotesBarProps): JSX.Element => {
  const { editNotes } = props
  /** Boolean that determines whether the app is being viewed with the dark (or light) theme */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** State setter to update loading state */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** Array of selected note IDs */
  const [selectedNoteIds, setSelectedNoteIds] =
    useRecoilState(atomSelectedNoteIds)

  /** Delete selected notes */
  const deleteNotes = (ids: string[]) => {
    axios({
      url: `${process.env.REACT_APP_API}/api/notes/batchDelete`,
      method: 'post',
      data: { ids },
    })
      .then((res) => {
        if (res.data) {
          getNotes(setIsLoading, setNotes)
        }
      })
      .catch((err) => console.error(err))
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
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="Clear selection"
                    onClick={() => setSelectedNoteIds([])}
                    data-testid="clear-selection-button"
                  >
                    <CloseIcon />
                  </IconButton>
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
                <Tooltip title="Pin selection">
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="Pin selection"
                    onClick={() => {
                      editNotes('isPinned', selectedNoteIds)
                      setSelectedNoteIds([])
                    }}
                    data-testid="pin-selection-button"
                  >
                    <PushPinOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Delete selection">
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="Delete selection"
                    onClick={() => deleteNotes(selectedNoteIds)}
                    data-testid="delete-selection-button"
                  >
                    <DeleteIcon />
                  </IconButton>
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
