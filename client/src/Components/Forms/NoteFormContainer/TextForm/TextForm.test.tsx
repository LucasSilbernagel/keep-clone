import { render, screen } from '@testing-library/react'
import TextForm from '.'
import { RecoilRoot } from 'recoil'

describe('TextForm', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <TextForm
          handleNoteTitleChange={jest.fn()}
          handleNoteTextChange={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('text-input')).toBeInTheDocument()
  })
})
