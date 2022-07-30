import { render, screen } from '@testing-library/react'
import NoteView from '.'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth, atomFilteredNotes } from '../../atoms'
import { mockNotes } from '../../DataHelpers'

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

afterEach(() => {
  localStorage.setItem('userProfile', JSON.stringify({}))
})

describe('NoteView', () => {
  test('renders on desktop screens', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomViewportWidth, 1440)
          snap.set(atomFilteredNotes, mockNotes)
        }}
      >
        <NoteView setAuthenticated={jest.fn()} deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByAltText('Google Keep')).toBeInTheDocument()
    expect(screen.getByText('Keep')).toBeInTheDocument()
    expect(screen.getByTestId('SearchIcon')).toBeInTheDocument()
    expect(screen.getByTestId('search-field')).toBeInTheDocument()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(screen.getByTestId('list-toggle-button')).toBeInTheDocument()
    expect(screen.getByTestId('settings-button')).toBeInTheDocument()
    expect(screen.getByTestId('profile-button')).toBeInTheDocument()
    expect(screen.getByText('Take a note...')).toBeInTheDocument()
    expect(screen.getByTestId('text-note-button')).toBeInTheDocument()
    expect(screen.getByTestId('checklist-button')).toBeInTheDocument()
    expect(screen.getByTestId('drawing-button')).toBeInTheDocument()
    expect(screen.getByTestId('recording-button')).toBeInTheDocument()
    expect(screen.getByTestId('image-button')).toBeInTheDocument()
    expect(screen.getByText('Note text')).toBeInTheDocument()
    expect(screen.getByText('Note title')).toBeInTheDocument()
    expect(screen.getByText('second item')).toBeInTheDocument()
    expect(screen.getByText('+ 1 Completed item')).toBeInTheDocument()
    expect(screen.getByText('My drawing')).toBeInTheDocument()
    expect(screen.getByAltText('my drawing')).toBeInTheDocument()
    expect(screen.getByText('My recording')).toBeInTheDocument()
    expect(screen.getByText('0:0:12')).toBeInTheDocument()
    expect(screen.getByText('My photo')).toBeInTheDocument()
    expect(screen.getByAltText('my upload')).toBeInTheDocument()
  })

  test('renders on mobile screens', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomViewportWidth, 440)
          snap.set(atomFilteredNotes, mockNotes)
        }}
      >
        <NoteView setAuthenticated={jest.fn()} deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('settings-button')).toBeInTheDocument()
    expect(screen.getByText('Search your notes')).toBeInTheDocument()
    expect(screen.getByTestId('mobile-search-button')).toBeInTheDocument()
    expect(screen.getByTestId('list-toggle-button')).toBeInTheDocument()
    expect(screen.getByTestId('profile-button')).toBeInTheDocument()
    expect(screen.getByTestId('plus-button')).toBeInTheDocument()
    expect(screen.getByTestId('checklist-button')).toBeInTheDocument()
    expect(screen.getByTestId('drawing-button')).toBeInTheDocument()
    expect(screen.getByTestId('recording-button')).toBeInTheDocument()
    expect(screen.getByTestId('image-button')).toBeInTheDocument()
    expect(screen.getByText('Note text')).toBeInTheDocument()
    expect(screen.getByText('Note title')).toBeInTheDocument()
    expect(screen.getByText('second item')).toBeInTheDocument()
    expect(screen.getByText('+ 1 Completed item')).toBeInTheDocument()
    expect(screen.getByText('My drawing')).toBeInTheDocument()
    expect(screen.getByAltText('my drawing')).toBeInTheDocument()
    expect(screen.getByText('My recording')).toBeInTheDocument()
    expect(screen.getByText('0:0:12')).toBeInTheDocument()
    expect(screen.getByText('My photo')).toBeInTheDocument()
    expect(screen.getByAltText('my upload')).toBeInTheDocument()
  })
})
