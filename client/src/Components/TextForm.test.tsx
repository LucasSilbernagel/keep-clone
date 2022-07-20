import { render, screen } from '@testing-library/react'
import TextForm from './TextForm'
import { RecoilRoot } from 'recoil'
// import '@types/jest'

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
