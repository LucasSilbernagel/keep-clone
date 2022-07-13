import AccountCircle from '@mui/icons-material/AccountCircle'
import GridViewIcon from '@mui/icons-material/GridView'
import SettingsIcon from '@mui/icons-material/Settings'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useRecoilState } from 'recoil'

import { atomIsSearching } from '../atoms'
import { atomIsGridView } from '../atoms'
import MobileSearch from './MobileSearch'
import ProfileMenu from './ProfileMenu'
import SettingsMenu from './SettingsMenu'

interface MobileAppBarProps {
  logOut: () => void
  handleSearch: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearSearch: () => void
}

const MobileAppBar = (props: MobileAppBarProps): JSX.Element => {
  const { logOut, handleSearch, clearSearch } = props

  /** The application theme */
  const theme = useTheme()
  /** The user's profile data, returned from localStorage */
  const userProfile = JSON.parse(window.localStorage.userProfile)
  /** Anchor element for the profile menu */
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  )
  /** Anchor element for the settings menu */
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  )
  /** Boolean that determines whether the search bar is being used */
  const [isSearching, setIsSearching] = useRecoilState(atomIsSearching)
  /** Boolean that determines whether notes are being displayed in a grid (or list) */
  const [isGridView, setIsGridView] = useRecoilState(atomIsGridView)
  /** Boolean that determines whether the profile menu is open */
  const isProfileMenuOpen = Boolean(profileAnchorEl)
  /** Function to open the profile menu */
  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget)
  }
  /** Function to close the profile menu */
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  }
  /** The ID of the profile menu */
  const profileMenuId = 'profile-menu'
  /** Boolean that determines whether the settings menu is open */
  const isSettingsMenuOpen = Boolean(settingsAnchorEl)
  /** Function to open the settings menu */
  const handleSettingsMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget)
  }
  /** Function to close the settings menu */
  const handleSettingsMenuClose = () => {
    setSettingsAnchorEl(null)
  }
  /** The ID of the settings menu */
  const settingsMenuId = 'settings-menu'

  if (!isSearching) {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <AppBar
          position="static"
          sx={{
            borderRadius: '30px',
            width: '96%',
            background: theme.palette.primary.dark,
          }}
        >
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item container alignItems="center" sm={9} xs={8}>
                <Grid item xs={1}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="Settings"
                    sx={{ mr: 1 }}
                    aria-controls={settingsMenuId}
                    aria-haspopup="true"
                    onClick={handleSettingsMenuOpen}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={11}>
                  <Button
                    onClick={() => setIsSearching(true)}
                    color="inherit"
                    sx={{
                      textTransform: 'initial',
                      width: '100%',
                      justifyContent: 'flex-start',
                      marginLeft: '1em',
                    }}
                  >
                    Search your notes
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                container
                sm={2}
                xs={4}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item xs={6}>
                  {isGridView ? (
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="list view"
                      onClick={() => setIsGridView(false)}
                    >
                      <SplitscreenIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="grid view"
                      onClick={() => setIsGridView(true)}
                    >
                      <GridViewIcon />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account"
                    aria-controls={profileMenuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
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
                </Grid>
              </Grid>
            </Grid>
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
  } else {
    return (
      <MobileSearch handleSearch={handleSearch} clearSearch={clearSearch} />
    )
  }
}

export default MobileAppBar
