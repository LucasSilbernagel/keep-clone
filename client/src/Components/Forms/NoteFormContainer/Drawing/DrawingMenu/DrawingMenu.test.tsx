import { render, screen } from '@testing-library/react'
import DrawingMenu from '.'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../../../atoms'

describe('DrawingMenu', () => {
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomViewportWidth, 1440)
        }}
      >
        <DrawingMenu
          selectedColor={{ label: 'Black', color: '#000000' }}
          setSelectedColor={jest.fn()}
          selectedStroke={5}
          setSelectedStroke={jest.fn()}
          handleBackClick={jest.fn()}
          clearCanvas={jest.fn()}
          undo={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('back-button')).toBeInTheDocument()
    expect(screen.getByTestId('clear-page-button')).toBeInTheDocument()
    expect(screen.getByTestId('eraser-button')).toBeInTheDocument()
    expect(screen.getByTestId('paintbrush-button')).toBeInTheDocument()
  })
})
