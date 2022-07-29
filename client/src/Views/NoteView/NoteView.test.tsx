import { render, screen } from '@testing-library/react'
import NoteView from '.'
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

describe('NoteView', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <NoteView setAuthenticated={jest.fn()} deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('Search your notes')).toBeInTheDocument()
    expect(screen.getByTestId('settings-button')).toBeInTheDocument()
    expect(screen.getByTestId('list-toggle-button')).toBeInTheDocument()
    expect(screen.getByTestId('profile-button')).toBeInTheDocument()
    expect(screen.getByTestId('plus-button')).toBeInTheDocument()
    expect(screen.getByTestId('checklist-button')).toBeInTheDocument()
    expect(screen.getByTestId('drawing-button')).toBeInTheDocument()
    expect(screen.getByTestId('recording-button')).toBeInTheDocument()
    expect(screen.getByTestId('image-button')).toBeInTheDocument()
  })
})
