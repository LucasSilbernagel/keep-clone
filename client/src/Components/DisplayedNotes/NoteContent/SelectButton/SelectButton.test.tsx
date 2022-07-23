import { render, screen } from '@testing-library/react'
import SelectButton from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../../DataHelpers'

describe('SelectButton', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <SelectButton note={mockNotes[1]} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('select-note')).toBeInTheDocument()
  })
})
