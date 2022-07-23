import { render, screen } from '@testing-library/react'
import CompletedListSummary from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../../../DataHelpers'

describe('CompletedListSummary', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <CompletedListSummary note={mockNotes[1]} />
      </RecoilRoot>
    )
    expect(screen.getByText('+ 1 Completed item')).toBeInTheDocument()
  })
})
