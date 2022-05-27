import { useState, MouseEvent } from 'react'
import { styled } from '@mui/material/styles'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Avatar,
  Grid,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import GoogleKeepLogo from '../../assets/keep_icon.png'
import ProfileMenu from '../ProfileMenu/ProfileMenu'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(10),
    width: 'auto',
  },
  background: theme.palette.primary.dark,
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}))

interface IComponentProps {
  logOut: () => void
}

const DesktopAppBar = (props: IComponentProps): JSX.Element => {
  const { logOut } = props
  const userProfile = JSON.parse(window.localStorage.userProfile)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="secondary" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <RefreshIcon />
            </IconButton>
            <IconButton size="large" color="inherit">
              <SplitscreenIcon />
            </IconButton>
            <IconButton size="large" color="inherit">
              <SettingsIcon />
            </IconButton>
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
