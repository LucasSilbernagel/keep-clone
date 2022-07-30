import { render, screen } from '@testing-library/react'
import DrawingForm from '.'
import { RecoilRoot } from 'recoil'
import { atomNoteBeingEdited, atomEditingID } from '../../../../../atoms'
import { mockNotes } from '../../../../../DataHelpers'

describe('DrawingForm', () => {
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomEditingID, '4')
          snap.set(atomNoteBeingEdited, mockNotes[2])
        }}
      >
        <DrawingForm handleNoteTitleChange={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('My drawing')).toBeInTheDocument()
    expect(screen.getByAltText('drawing')).toBeInTheDocument()
  })
})
