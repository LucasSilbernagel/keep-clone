import { render, screen } from '@testing-library/react'
import NoteContent from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../DataHelpers'

describe('NoteContent', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <NoteContent note={mockNotes[1]} deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('second item')).toBeInTheDocument()
    expect(screen.getByText('+ 1 Completed item')).toBeInTheDocument()
  })
})
