import { MenuItem, Menu, ListItemText } from '@mui/material'
import { atomIsDarkTheme } from '../atoms'
import { useRecoilState } from 'recoil'

interface SettingsMenuProps {
  settingsAnchorEl: null | HTMLElement
  settingsMenuId: string
  isSettingsMenuOpen: boolean
  handleSettingsMenuClose: () => void
}

const SettingsMenu = (props: SettingsMenuProps): JSX.Element => {
  const {
    settingsAnchorEl,
    settingsMenuId,
    isSettingsMenuOpen,
    handleSettingsMenuClose,
  } = props

  /** Whether the dark (or light) theme is being used */
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(atomIsDarkTheme)

  /** Function to turn off the dark theme */
  const turnOffDarkTheme = () => {
    window.localStorage.setItem('keepCloneDarkTheme', 'false')
    setIsDarkTheme(false)
  }

  /** Function to turn on the dark theme */
  const turnOnDarkTheme = () => {
    window.localStorage.setItem('keepCloneDarkTheme', 'true')
    setIsDarkTheme(true)
  }

  return (
    <Menu
      anchorEl={settingsAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={settingsMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isSettingsMenuOpen}
      onClose={handleSettingsMenuClose}
      MenuListProps={{
        disablePadding: true,
      }}
    >
      {isDarkTheme ? (
        <MenuItem onClick={turnOffDarkTheme}>
          <ListItemText sx={{ textAlign: 'center' }}>
            Disable dark theme
          </ListItemText>
        </MenuItem>
      ) : (
        <MenuItem onClick={turnOnDarkTheme}>
          <ListItemText sx={{ textAlign: 'center' }}>
            Enable dark theme
          </ListItemText>
        </MenuItem>
      )}
    </Menu>
  )
}

export default SettingsMenu
