import { render, screen } from '@testing-library/react'
import DrawingTools from '.'
import { RecoilRoot } from 'recoil'

describe('DrawingTools', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <DrawingTools
          selectedColor={{ label: 'Black', color: '#000000' }}
          setSelectedColor={jest.fn()}
          selectedStroke={5}
          setSelectedStroke={jest.fn()}
          clearCanvas={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('clear-page-button')).toBeInTheDocument()
    expect(screen.getByTestId('eraser-button')).toBeInTheDocument()
    expect(screen.getByTestId('paintbrush-button')).toBeInTheDocument()
  })
})
