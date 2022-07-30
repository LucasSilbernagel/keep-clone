import { render, screen, fireEvent } from '@testing-library/react'
import SelectedNotesBar from '.'
import { RecoilRoot } from 'recoil'
import { atomNotes, atomSelectedNoteIds } from '../../../../atoms'
import { mockNotes } from '../../../../DataHelpers'

describe('SelectedNotesBar', () => {
  const editNotes = jest.fn()
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomNotes, mockNotes)
          snap.set(atomSelectedNoteIds, ['1', '2'])
        }}
      >
        <SelectedNotesBar editNotes={editNotes} />
      </RecoilRoot>
    )
    const pinButton = screen.getByTestId('pin-selection-button')
    expect(screen.getByText('2 selected')).toBeInTheDocument()
    expect(screen.getByTestId('clear-selection-button')).toBeInTheDocument()
    expect(pinButton).toBeInTheDocument()
    expect(screen.getByTestId('delete-selection-button')).toBeInTheDocument()
    fireEvent.click(pinButton)
    expect(editNotes).toHaveBeenCalledTimes(1)
  })
})
