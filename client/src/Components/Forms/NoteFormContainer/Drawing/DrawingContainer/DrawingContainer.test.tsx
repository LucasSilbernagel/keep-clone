import { render, screen } from '@testing-library/react'
import DrawingContainer from '.'
import { RecoilRoot } from 'recoil'
import { atomNoteType, atomIsDrawingActive } from '../../../../../atoms'

describe('DrawingContainer', () => {
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomNoteType, 'drawing')
          snap.set(atomIsDrawingActive, true)
        }}
      >
        <DrawingContainer />
      </RecoilRoot>
    )
    expect(screen.getByTestId('back-button')).toBeInTheDocument()
    expect(screen.getByTestId('clear-page-button')).toBeInTheDocument()
    expect(screen.getByTestId('eraser-button')).toBeInTheDocument()
    expect(screen.getByTestId('paintbrush-button')).toBeInTheDocument()
  })
})
