import { render, screen } from '@testing-library/react'
import TextForm from '.'
import { RecoilRoot } from 'recoil'
import { atomNoteBeingEdited, atomEditingID } from '../../../../atoms'
import { mockNotes } from '../../../../DataHelpers'

describe('TextForm', () => {
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomNoteBeingEdited, mockNotes[0])
          snap.set(atomEditingID, mockNotes[0]._id)
        }}
      >
        <TextForm
          handleNoteTitleChange={jest.fn()}
          handleNoteTextChange={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('text-input')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByText('Note title')).toBeInTheDocument()
    expect(screen.getByText('Note text')).toBeInTheDocument()
  })
})
