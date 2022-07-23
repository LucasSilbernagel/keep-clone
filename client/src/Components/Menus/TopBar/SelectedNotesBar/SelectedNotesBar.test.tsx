import { render, screen } from '@testing-library/react'
import SelectedNotesBar from '.'
import { RecoilRoot } from 'recoil'

describe('SelectedNotesBar', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <SelectedNotesBar editNotes={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByText('0 selected')).toBeInTheDocument()
    expect(screen.getByTestId('clear-selection-button')).toBeInTheDocument()
    expect(screen.getByTestId('pin-selection-button')).toBeInTheDocument()
    expect(screen.getByTestId('delete-selection-button')).toBeInTheDocument()
  })
})
