import { render, screen } from '@testing-library/react'
import PlusButton from '.'
import { RecoilRoot } from 'recoil'

describe('PlusButton', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <PlusButton />
      </RecoilRoot>
    )
    expect(screen.getByTestId('plus-button')).toBeInTheDocument()
  })
})
