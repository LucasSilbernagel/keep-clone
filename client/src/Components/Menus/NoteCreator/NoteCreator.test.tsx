import { render, screen } from '@testing-library/react'
import NoteCreator from '.'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../atoms'

describe('NoteCreator', () => {
  test('renders desktop note creator', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomViewportWidth, 1440)
        }}
      >
        <NoteCreator
          creatingNote={false}
          setCreatingNote={jest.fn()}
          finishCreatingNote={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('text-note-button')).toBeInTheDocument()
    expect(screen.getByTestId('checklist-button')).toBeInTheDocument()
    expect(screen.getByTestId('drawing-button')).toBeInTheDocument()
    expect(screen.getByTestId('recording-button')).toBeInTheDocument()
    expect(screen.getByTestId('image-button')).toBeInTheDocument()
  })

  test('renders mobile note creator', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomViewportWidth, 440)
        }}
      >
        <NoteCreator
          creatingNote={false}
          setCreatingNote={jest.fn()}
          finishCreatingNote={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('plus-button')).toBeInTheDocument()
    expect(screen.getByTestId('checklist-button')).toBeInTheDocument()
    expect(screen.getByTestId('drawing-button')).toBeInTheDocument()
    expect(screen.getByTestId('recording-button')).toBeInTheDocument()
    expect(screen.getByTestId('image-button')).toBeInTheDocument()
  })
})
