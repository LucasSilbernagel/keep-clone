import AccountCircle from '@mui/icons-material/AccountCircle'
import {
  Avatar,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'

interface ProfileMenuProps {
  profileAnchorEl: null | HTMLElement
  profileMenuId: string
  isProfileMenuOpen: boolean
  handleProfileMenuClose: () => void
  logOut: () => void
}

const ProfileMenu = (props: ProfileMenuProps): JSX.Element => {
  const {
    profileAnchorEl,
    profileMenuId,
    isProfileMenuOpen,
    handleProfileMenuClose,
    logOut,
  } = props

  /** User profile data, returned from localStorage */
  const userProfile = JSON.parse(window.localStorage.userProfile)

  return (
    <Menu
      PaperProps={{
        style: {
          width: 350,
          paddingTop: 10,
        },
      }}
      anchorEl={profileAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ paddingBottom: '2em' }}
      >
        <Grid item>
          {userProfile.imageUrl.length > 0 ? (
            <Avatar
              alt={userProfile.name}
              src={userProfile.imageUrl}
              sx={{ width: '80px', height: '80px' }}
            />
          ) : (
            <AccountCircle
              fontSize="large"
              sx={{ width: '80px', height: '80px' }}
            />
          )}
        </Grid>
        <Grid item>
          <Typography
            fontWeight="bold"
            variant="subtitle1"
            sx={{ marginTop: '1em' }}
          >
            {userProfile.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{userProfile.email}</Typography>
        </Grid>
      </Grid>
      <MenuItem onClick={logOut}>
        <ListItemText sx={{ textAlign: 'center' }}>Sign out</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default ProfileMenu
