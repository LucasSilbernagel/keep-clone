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
import MenuIcon from '@mui/icons-material/Menu'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { useRecoilState } from 'recoil'
import { atomIsSearching } from '../../atoms'
import MobileSearch from '../Search/MobileSearch'

interface IComponentProps {
  logOut: () => void
  handleSearch: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearSearch: () => void
}

const MobileAppBar = (props: IComponentProps): JSX.Element => {
  const { logOut, handleSearch, clearSearch } = props
  const theme = useTheme()
  const userProfile = JSON.parse(window.localStorage.userProfile)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [isSearching, setIsSearching] = useRecoilState(atomIsSearching)

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuId = 'account-menu'

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
                    aria-label="open drawer"
                    sx={{ mr: 1 }}
                  >
                    <MenuIcon />
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
                  <IconButton size="large" color="inherit">
                    <SplitscreenIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6}>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
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
          anchorEl={anchorEl}
          menuId={menuId}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
          logOut={logOut}
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
