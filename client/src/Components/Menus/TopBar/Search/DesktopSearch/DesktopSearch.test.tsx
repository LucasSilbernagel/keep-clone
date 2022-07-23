import { render, screen } from '@testing-library/react'
import DesktopSearch from '.'
import { RecoilRoot } from 'recoil'

describe('DesktopSearch', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <DesktopSearch handleSearch={jest.fn()} clearSearch={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('search-field')).toBeInTheDocument()
  })
})
