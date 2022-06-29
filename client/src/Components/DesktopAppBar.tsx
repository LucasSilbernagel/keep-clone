import { useState, MouseEvent, ChangeEvent } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Tooltip,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import RefreshIcon from '@mui/icons-material/Refresh'
import AccountCircle from '@mui/icons-material/AccountCircle'
import GoogleKeepLogo from '../assets/keep_icon.png'
import ProfileMenu from './ProfileMenu'
import DesktopSearch from './DesktopSearch'
import {
  atomIsLoading,
  atomIsGridView,
  atomIsDarkTheme,
  atomNotes,
} from '../atoms'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import GridViewIcon from '@mui/icons-material/GridView'
import SettingsMenu from './SettingsMenu'
import { getNotes } from '../LogicHelpers'

interface DesktopAppBarProps {
  logOut: () => void
  handleSearch: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearSearch: () => void
}

const DesktopAppBar = (props: DesktopAppBarProps): JSX.Element => {
  const { logOut, handleSearch, clearSearch } = props

  /** User profile data, returned from localStorage */
  const userProfile = JSON.parse(window.localStorage.userProfile)
  /** Anchor element for the profile menu */
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  )
  /** Boolean that determines whether the app is being viewed with the dark (or light) theme */
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  /** Anchor element for the settings menu */
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  )
  /** Boolean that determines whether notes are loading from the back end */
  const [isLoading, setIsLoading] = useRecoilState(atomIsLoading)
  /** Boolean that determines whether notes are being displayed as a grid (or list) */
  const [isGridView, setIsGridView] = useRecoilState(atomIsGridView)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** Boolean that determines whether the profile menu is open */
  const isProfileMenuOpen = Boolean(profileAnchorEl)
  /** Boolean that determines whether the settings menu is open */
  const isSettingsMenuOpen = Boolean(settingsAnchorEl)

  /** Function to open the profile menu */
  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget)
  }

  /** Function to close the profile menu */
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  }

  /** The profile menu ID */
  const profileMenuId = 'profile-menu'

  /** Function to open the settings menu */
  const handleSettingsMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget)
  }

  /** Function to close the settings menu */
  const handleSettingsMenuClose = () => {
    setSettingsAnchorEl(null)
  }

  /** The settings menu ID */
  const settingsMenuId = 'settings-menu'

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
          <Grid item sx={{ mr: 6.5 }}></Grid>
          <Avatar
            alt="Google Keep"
            src={GoogleKeepLogo}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: '0.5em' }}
          >
            Keep
          </Typography>
          <DesktopSearch
            handleSearch={handleSearch}
            clearSearch={clearSearch}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: '1em',
                }}
              >
                <CircularProgress color="inherit" size={18} />
              </Box>
            ) : (
              <Tooltip title="Refresh">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => getNotes(setIsLoading, setNotes)}
                  aria-label="Refresh"
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            )}
            {isGridView ? (
              <Tooltip title="List view">
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="List view"
                  onClick={() => setIsGridView(false)}
                >
                  <SplitscreenIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Grid view">
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="Grid view"
                  onClick={() => setIsGridView(true)}
                >
                  <GridViewIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Settings">
              <IconButton
                size="large"
                color="inherit"
                aria-label="Settings"
                aria-controls={settingsMenuId}
                aria-haspopup="true"
                onClick={handleSettingsMenuOpen}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Account">
              <IconButton
                size="large"
                edge="end"
                aria-label="account"
                aria-controls={profileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ marginLeft: '1em' }}
              >
                {userProfile.imageUrl.length > 0 ? (
                  <Avatar
                    alt={userProfile.name}
                    src={userProfile.imageUrl}
                    sx={{ width: '35px', height: '35px' }}
                  />
                ) : (
                  <AccountCircle fontSize="large" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileMenu
        profileAnchorEl={profileAnchorEl}
        profileMenuId={profileMenuId}
        isProfileMenuOpen={isProfileMenuOpen}
        handleProfileMenuClose={handleProfileMenuClose}
        logOut={logOut}
      />
      <SettingsMenu
        settingsAnchorEl={settingsAnchorEl}
        settingsMenuId={settingsMenuId}
        isSettingsMenuOpen={isSettingsMenuOpen}
        handleSettingsMenuClose={handleSettingsMenuClose}
      />
    </Box>
  )
}

export default DesktopAppBar