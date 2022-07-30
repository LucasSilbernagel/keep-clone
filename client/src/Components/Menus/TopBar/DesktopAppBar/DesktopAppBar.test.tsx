import { render, screen } from '@testing-library/react'
import DesktopAppBar from '.'
import { RecoilRoot } from 'recoil'

beforeEach(() =>
  localStorage.setItem(
    'userProfile',
    JSON.stringify({
      imageUrl: 'test',
      name: 'Test User',
      email: 'test@email.com',
      googleId: '123',
    })
  )
)

afterEach(() => localStorage.setItem('userProfile', JSON.stringify({})))

describe('DesktopAppBar', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <DesktopAppBar
          logOut={jest.fn()}
          handleSearch={jest.fn()}
          clearSearch={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByAltText('Google Keep')).toBeInTheDocument()
    expect(screen.getByText('Keep')).toBeInTheDocument()
    expect(screen.getByTestId('refresh-button')).toBeInTheDocument()
    expect(screen.getByTestId('list-toggle-button')).toBeInTheDocument()
    expect(screen.getByTestId('settings-button')).toBeInTheDocument()
    expect(screen.getByTestId('profile-button')).toBeInTheDocument()
  })
})
