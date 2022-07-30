import { render, screen } from '@testing-library/react'
import Notes from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../DataHelpers'
import { atomFilteredNotes } from '../../../atoms'

describe('Notes', () => {
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => snap.set(atomFilteredNotes, mockNotes)}
      >
        <Notes deleteNote={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('Pinned')).toBeInTheDocument()
    expect(screen.getByText('Others')).toBeInTheDocument()
    expect(screen.getByText('Note text')).toBeInTheDocument()
    expect(screen.getByText('Note title')).toBeInTheDocument()
    expect(screen.getByText('second item')).toBeInTheDocument()
    expect(screen.getByText('+ 1 Completed item')).toBeInTheDocument()
    expect(screen.getByText('My drawing')).toBeInTheDocument()
    expect(screen.getByAltText('my drawing')).toBeInTheDocument()
    expect(screen.getByText('My recording')).toBeInTheDocument()
    expect(screen.getByText('0:0:12')).toBeInTheDocument()
    expect(screen.getByText('My photo')).toBeInTheDocument()
    expect(screen.getByAltText('my upload')).toBeInTheDocument()
  })
})
