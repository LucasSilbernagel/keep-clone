import { render, screen } from '@testing-library/react'
import NoteContentFooter from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../../DataHelpers'
import { atomViewportWidth } from '../../../../atoms'

describe('NoteContentFooter', () => {
  test('renders', () => {
    render(
      <RecoilRoot initializeState={(snap) => snap.set(atomViewportWidth, 1440)}>
        <NoteContentFooter
          note={mockNotes[1]}
          deleteNote={jest.fn()}
          moreAnchorEl={null}
          setMoreAnchorEl={jest.fn()}
          isMoreMenuOpen={false}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('more-button')).toBeInTheDocument()
  })
})
