import { render, screen } from '@testing-library/react'
import MobileSearch from '.'
import { RecoilRoot } from 'recoil'

describe('MobileSearch', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <MobileSearch handleSearch={jest.fn()} clearSearch={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('search-field')).toBeInTheDocument()
  })
})
