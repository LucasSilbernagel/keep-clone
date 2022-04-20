import {
  Typography,
  MenuItem,
  Menu,
  Avatar,
  Grid,
  ListItemText,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'

interface IComponentProps {
  anchorEl: null | HTMLElement
  menuId: string
  isMenuOpen: boolean
  handleMenuClose: () => void
  logOut: () => void
}

const ProfileMenu = (props: IComponentProps): JSX.Element => {
  const { anchorEl, menuId, isMenuOpen, handleMenuClose, logOut } = props

  const userProfile = JSON.parse(window.localStorage.userProfile)

  return (
    <Menu
      PaperProps={{
        style: {
          width: 350,
          paddingTop: 10,
        },
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
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
