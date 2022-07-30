import { render, screen } from '@testing-library/react'
import NoteContent from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../DataHelpers'

describe('NoteContent', () => {
  test('renders text note', () => {
    render(
      <RecoilRoot>
        <NoteContent note={mockNotes[0]} deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('Note title')).toBeInTheDocument()
    expect(screen.getByText('Note text')).toBeInTheDocument()
  })

  test('renders checklist note', () => {
    render(
      <RecoilRoot>
        <NoteContent note={mockNotes[1]} deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('second item')).toBeInTheDocument()
    expect(screen.getByText('+ 1 Completed item')).toBeInTheDocument()
  })

  test('renders drawing', () => {
    render(
      <RecoilRoot>
        <NoteContent note={mockNotes[2]} deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('My drawing')).toBeInTheDocument()
    expect(screen.getByAltText('my drawing')).toBeInTheDocument()
  })

  test('renders recording', () => {
    render(
      <RecoilRoot>
        <NoteContent note={mockNotes[3]} deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('My recording')).toBeInTheDocument()
    expect(screen.getByText('0:0:12')).toBeInTheDocument()
  })

  test('renders image', () => {
    render(
      <RecoilRoot>
        <NoteContent note={mockNotes[4]} deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('My photo')).toBeInTheDocument()
    expect(screen.getByAltText('my upload')).toBeInTheDocument()
  })
})
