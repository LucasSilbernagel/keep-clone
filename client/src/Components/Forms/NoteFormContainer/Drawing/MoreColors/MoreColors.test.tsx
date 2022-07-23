import { render, screen } from '@testing-library/react'
import MoreColors from '.'
import { RecoilRoot } from 'recoil'

describe('MoreColors', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <MoreColors
          selectedColor={{ label: 'Black', color: '#000000' }}
          showingMoreColors={true}
          updateColor={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('Deep Purple')).toBeInTheDocument()
  })
})
