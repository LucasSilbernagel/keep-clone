import { render, screen } from '@testing-library/react'
import NoteModal from '.'
import { RecoilRoot } from 'recoil'
import { atomIsModalOpen, atomViewportWidth } from '../../atoms'

describe('NoteModal', () => {
  test('renders on desktop', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomIsModalOpen, true)
          snap.set(atomViewportWidth, 1440)
        }}
      >
        <NoteModal
          deleteNote={jest.fn()}
          saveNewNote={jest.fn()}
          finishCreatingNote={jest.fn()}
          creatingNote={true}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })

  test('renders on mobile', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomIsModalOpen, true)
          snap.set(atomViewportWidth, 440)
        }}
      >
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
