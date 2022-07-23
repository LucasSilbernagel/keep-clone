import { render, screen } from '@testing-library/react'
import NoteGrid from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../../DataHelpers'

describe('NoteGrid', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <NoteGrid deleteNote={jest.fn()} notes={mockNotes} />
      </RecoilRoot>
    )
    expect(screen.getByText('Note title')).toBeInTheDocument()
    expect(screen.getByText('Note text')).toBeInTheDocument()
    expect(screen.getByText('second item')).toBeInTheDocument()
    expect(screen.getByText('+ 1 Completed item')).toBeInTheDocument()
    expect(screen.getByAltText('my drawing')).toBeInTheDocument()
    expect(screen.getByText('0:0:12')).toBeInTheDocument()
    expect(screen.getByAltText('my upload')).toBeInTheDocument()
  })
})
