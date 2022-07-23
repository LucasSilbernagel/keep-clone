import { render, screen } from '@testing-library/react'
import NoteTitleInput from '.'
import { RecoilRoot } from 'recoil'

describe('NoteTitleInput', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <NoteTitleInput handleNoteTitleChange={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
  })
})
