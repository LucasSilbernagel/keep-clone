import { MenuItem, Menu, ListItemText } from '@mui/material'
import { atomIsDarkTheme } from '../atoms'
import { useRecoilValue } from 'recoil'

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

  const isDarkTheme = useRecoilValue(atomIsDarkTheme)

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
        <MenuItem
          onClick={() =>
            window.localStorage.setItem('keepCloneDarkTheme', 'false')
          }
        >
          <ListItemText sx={{ textAlign: 'center' }}>
            Disable dark theme
          </ListItemText>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() =>
            window.localStorage.setItem('keepCloneDarkTheme', 'true')
          }
        >
          <ListItemText sx={{ textAlign: 'center' }}>
            Enable dark theme
          </ListItemText>
        </MenuItem>
      )}
    </Menu>
  )
}

export default SettingsMenu
