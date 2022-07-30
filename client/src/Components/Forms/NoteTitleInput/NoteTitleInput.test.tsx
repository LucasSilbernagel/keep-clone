import { render, screen } from '@testing-library/react'
import NoteTitleInput from '.'
import { RecoilRoot } from 'recoil'
import { atomNoteBeingEdited, atomEditingID } from '../../../atoms'
import { mockNotes } from '../../../DataHelpers'

describe('NoteTitleInput', () => {
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomNoteBeingEdited, mockNotes[0])
          snap.set(atomEditingID, mockNotes[0]._id)
        }}
      >
        <NoteTitleInput handleNoteTitleChange={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByText('Note title')).toBeInTheDocument()
  })
})
