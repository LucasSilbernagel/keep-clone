import { render, screen } from '@testing-library/react'
import NoteFormContainer from '.'
import { RecoilRoot } from 'recoil'

describe('NoteFormContainer', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <NoteFormContainer finishCreatingNote={jest.fn()} inModal={false} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByTestId('text-input')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
  })
})
