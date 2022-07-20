import { render, screen } from '@testing-library/react'
import TextForm from './TextForm'
import { RecoilRoot } from 'recoil'

describe('TextForm', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <TextForm
          handleNoteTitleChange={() => null}
          handleNoteTextChange={() => null}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('text-input')).toBeInTheDocument()
  })
})
