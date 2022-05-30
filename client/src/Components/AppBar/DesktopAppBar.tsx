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
import GoogleKeepLogo from '../../assets/keep_icon.png'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import DesktopSearch from '../Search/DesktopSearch'
import { atomIsLoading, atomIsGridView } from '../../atoms'
import { useRecoilValue, useRecoilState } from 'recoil'
import GridViewIcon from '@mui/icons-material/GridView'

interface IComponentProps {
  logOut: () => void
  handleSearch: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearSearch: () => void
  getNotes: () => void
}

const DesktopAppBar = (props: IComponentProps): JSX.Element => {
  const { logOut, handleSearch, clearSearch, getNotes } = props
  const userProfile = JSON.parse(window.localStorage.userProfile)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isLoading = useRecoilValue(atomIsLoading)
  const [isGridView, setIsGridView] = useRecoilState(atomIsGridView)

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuId = 'account-menu'

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
                  onClick={getNotes}
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
              <IconButton size="large" color="inherit" aria-label="Settings">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
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
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileMenu
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        logOut={logOut}
      />
    </Box>
  )
}

export default DesktopAppBar
