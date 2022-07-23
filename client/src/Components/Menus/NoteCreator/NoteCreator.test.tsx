import { render, screen } from '@testing-library/react'
import NoteCreator from '.'
import { RecoilRoot } from 'recoil'

describe('NoteCreator', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
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
