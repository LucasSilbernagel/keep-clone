import { render, screen } from '@testing-library/react'
import PinnedLabel from '.'
import { RecoilRoot } from 'recoil'

describe('PinnedLabel', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <PinnedLabel pinnedStatus="Pinned" />
      </RecoilRoot>
    )
    expect(screen.getByText('Pinned')).toBeInTheDocument()
  })
})
