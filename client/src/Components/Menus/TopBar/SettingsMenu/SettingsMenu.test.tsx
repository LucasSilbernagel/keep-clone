import { render, screen } from '@testing-library/react'
import SettingsMenu from '.'
import { RecoilRoot } from 'recoil'

describe('SettingsMenu', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <SettingsMenu
          settingsAnchorEl={null}
          settingsMenuId="menu-id"
          isSettingsMenuOpen={true}
          handleSettingsMenuClose={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByText('Enable dark theme')).toBeInTheDocument()
  })
})
