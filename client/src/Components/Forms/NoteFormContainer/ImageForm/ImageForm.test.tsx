import { render, screen } from '@testing-library/react'
import ImageForm from '.'
import { RecoilRoot } from 'recoil'

describe('ImageForm', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <ImageForm handleNoteTitleChange={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByAltText('my upload')).toBeInTheDocument()
  })
})
