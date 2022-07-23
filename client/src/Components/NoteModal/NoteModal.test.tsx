import { render, screen } from '@testing-library/react'
import NoteModal from '.'
import { RecoilRoot } from 'recoil'
import { atomIsModalOpen } from '../../atoms'

describe('NoteModal', () => {
  test('renders', () => {
    render(
      <RecoilRoot initializeState={(snap) => snap.set(atomIsModalOpen, true)}>
        <NoteModal
          deleteNote={jest.fn()}
          saveNewNote={jest.fn()}
          finishCreatingNote={jest.fn()}
          creatingNote={true}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByTestId('back-button')).toBeInTheDocument()
  })
})
