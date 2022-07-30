import { render, screen } from '@testing-library/react'
import PinButton from '.'
import { RecoilRoot } from 'recoil'

describe('PinButton', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <PinButton rightAlignment={0} topAlignment={0} isAlreadySaved={false} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
  })
})
