import { render, screen } from '@testing-library/react'
import PinButton from '.'
import { RecoilRoot } from 'recoil'
import { atomIsModalOpen } from '../../atoms'

describe('PinButton', () => {
  test('renders', () => {
    render(
      <RecoilRoot initializeState={(snap) => snap.set(atomIsModalOpen, true)}>
        <PinButton rightAlignment={0} topAlignment={0} isAlreadySaved={false} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
  })
})
