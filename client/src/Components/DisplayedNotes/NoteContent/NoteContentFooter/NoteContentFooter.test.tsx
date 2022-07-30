import { render, screen, fireEvent } from '@testing-library/react'
import NoteContentFooter from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../../DataHelpers'
import { atomViewportWidth } from '../../../../atoms'

describe('NoteContentFooter', () => {
  test('renders with menu closed', () => {
    const deleteNote = jest.fn()
    const setMoreAnchorEl = jest.fn()
    render(
      <RecoilRoot initializeState={(snap) => snap.set(atomViewportWidth, 1440)}>
        <NoteContentFooter
          note={mockNotes[1]}
          deleteNote={deleteNote}
          moreAnchorEl={null}
          setMoreAnchorEl={setMoreAnchorEl}
          isMoreMenuOpen={false}
        />
      </RecoilRoot>
    )
    const moreButton = screen.getByTestId('more-button')
    expect(moreButton).toBeInTheDocument()
    fireEvent.click(moreButton)
    expect(setMoreAnchorEl).toHaveBeenCalledTimes(1)
  })

  test('renders with menu open', () => {
    const deleteNote = jest.fn()
    const setMoreAnchorEl = jest.fn()
    render(
      <RecoilRoot initializeState={(snap) => snap.set(atomViewportWidth, 1440)}>
        <NoteContentFooter
          note={mockNotes[1]}
          deleteNote={deleteNote}
          moreAnchorEl={null}
          setMoreAnchorEl={setMoreAnchorEl}
          isMoreMenuOpen={true}
        />
      </RecoilRoot>
    )
    const moreButton = screen.getByTestId('more-button')
    expect(moreButton).toBeInTheDocument()
    expect(screen.getByText('Delete note')).toBeInTheDocument()
    expect(screen.getByText('Make a copy')).toBeInTheDocument()
    const deleteNoteButton = screen.getByTestId('delete-note-button')
    expect(deleteNoteButton).toBeInTheDocument()
    fireEvent.click(deleteNoteButton)
    expect(deleteNote).toHaveBeenCalledTimes(1)
  })
})
