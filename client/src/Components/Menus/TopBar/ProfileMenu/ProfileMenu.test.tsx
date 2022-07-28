import { render, screen } from '@testing-library/react'
import ProfileMenu from '.'
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

describe('ProfileMenu', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <ProfileMenu
          logOut={jest.fn()}
          profileAnchorEl={null}
          profileMenuId="profile-menu"
          isProfileMenuOpen={true}
          handleProfileMenuClose={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByAltText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@email.com')).toBeInTheDocument()
    expect(screen.getByText('Sign out')).toBeInTheDocument()
  })
})
