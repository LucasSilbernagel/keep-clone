import { render, screen } from '@testing-library/react'
import MobileAppBar from '.'
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

describe('MobileAppBar', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <MobileAppBar
          logOut={jest.fn()}
          handleSearch={jest.fn()}
          clearSearch={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('settings-button')).toBeInTheDocument()
    expect(screen.getByText('Search your notes')).toBeInTheDocument()
    expect(screen.getByTestId('list-toggle-button')).toBeInTheDocument()
    expect(screen.getByTestId('profile-button')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })
})
