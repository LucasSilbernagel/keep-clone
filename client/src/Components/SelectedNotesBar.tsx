import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Tooltip,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { atomIsDarkTheme, atomFilteredNotes } from '../atoms'
import { useRecoilValue } from 'recoil'

const SelectedNotesBar = (): JSX.Element => {
  /** Boolean that determines whether the app is being viewed with the dark (or light) theme */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** Array of notes, filtered */
  const filteredNotes = useRecoilValue(atomFilteredNotes)

  return (
    <Box sx={{ flexGrow: 1 }}>
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
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography sx={{ ml: 2 }}>
                  {filteredNotes.filter((note) => note.isSelected).length}{' '}
                  selected
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
