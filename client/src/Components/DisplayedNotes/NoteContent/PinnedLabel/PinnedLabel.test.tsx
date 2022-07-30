import { render, screen } from '@testing-library/react'
import PinnedLabel from '.'
import { RecoilRoot } from 'recoil'

describe('PinnedLabel', () => {
  test('renders Pinned', () => {
    render(
      <RecoilRoot>
        <PinnedLabel pinnedStatus="Pinned" />
      </RecoilRoot>
    )
    expect(screen.getByText('Pinned')).toBeInTheDocument()
  })

  test('renders Others', () => {
    render(
      <RecoilRoot>
        <PinnedLabel pinnedStatus="Others" />
      </RecoilRoot>
    )
    expect(screen.getByText('Others')).toBeInTheDocument()
  })
})
