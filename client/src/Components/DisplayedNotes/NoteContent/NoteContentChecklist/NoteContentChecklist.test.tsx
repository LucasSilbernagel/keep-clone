import { render, screen } from '@testing-library/react'
import NoteContentChecklist from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../../DataHelpers'

describe('NoteContentChecklist', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <NoteContentChecklist note={mockNotes[1]} />
      </RecoilRoot>
    )
    expect(screen.getByText('second item')).toBeInTheDocument()
    expect(screen.getByText('+ 1 Completed item')).toBeInTheDocument()
  })
})
