import { render, screen } from '@testing-library/react'
import ImageForm from '.'
import { RecoilRoot } from 'recoil'
import { atomNoteBeingEdited, atomEditingID } from '../../../../atoms'
import { mockNotes } from '../../../../DataHelpers'

describe('ImageForm', () => {
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomNoteBeingEdited, mockNotes[4])
          snap.set(atomEditingID, mockNotes[4]._id)
        }}
      >
        <ImageForm handleNoteTitleChange={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('My photo')).toBeInTheDocument()
    expect(screen.getByAltText('my upload')).toBeInTheDocument()
  })
})
