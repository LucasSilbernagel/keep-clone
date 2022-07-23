import { render, screen } from '@testing-library/react'
import NoteModalFooter from '.'
import { RecoilRoot } from 'recoil'

describe('NoteModalFooter', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <NoteModalFooter
          handleCloseModal={jest.fn()}
          saveEditedNote={jest.fn()}
          deleteNote={jest.fn()}
          saveNewNote={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('more-button')).toBeInTheDocument()
  })
})
