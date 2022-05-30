import { useState, MouseEvent, ChangeEvent } from 'react'
import { useTheme } from '@mui/material/styles'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  Grid,
  Button,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { atomIsSearching } from '../../atoms'
import MobileSearch from '../Search/MobileSearch'
import { atomIsGridView } from '../../atoms'
import { useRecoilState } from 'recoil'
import GridViewIcon from '@mui/icons-material/GridView'
import SettingsMenu from '../SettingsMenu'

interface IComponentProps {
  logOut: () => void
  handleSearch: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearSearch: () => void
}

const MobileAppBar = (props: IComponentProps): JSX.Element => {
  const { logOut, handleSearch, clearSearch } = props
  const theme = useTheme()
  const userProfile = JSON.parse(window.localStorage.userProfile)
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  )
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  )

  const [isSearching, setIsSearching] = useRecoilState(atomIsSearching)

  const [isGridView, setIsGridView] = useRecoilState(atomIsGridView)

  const isProfileMenuOpen = Boolean(profileAnchorEl)

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  }

  const profileMenuId = 'account-menu'

  const isSettingsMenuOpen = Boolean(settingsAnchorEl)

  const handleSettingsMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget)
  }

  const handleSettingsMenuClose = () => {
    setSettingsAnchorEl(null)
  }

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
