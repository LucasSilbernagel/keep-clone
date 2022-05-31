import { MenuItem, Menu, ListItemText } from '@mui/material'
import { atomIsDarkTheme } from '../atoms'
import { useRecoilState } from 'recoil'

interface IComponentProps {
  settingsAnchorEl: null | HTMLElement
  settingsMenuId: string
  isSettingsMenuOpen: boolean
  handleSettingsMenuClose: () => void
}

const SettingsMenu = (props: IComponentProps): JSX.Element => {
  const {
    settingsAnchorEl,
    settingsMenuId,
    isSettingsMenuOpen,
    handleSettingsMenuClose,
  } = props

  const [isDarkTheme, setIsDarkTheme] = useRecoilState(atomIsDarkTheme)

  const turnOffDarkTheme = () => {
    window.localStorage.setItem('keepCloneDarkTheme', 'false')
    setIsDarkTheme(false)
  }

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
