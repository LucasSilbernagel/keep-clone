import { render, screen } from '@testing-library/react'
import MobileDrawingMenu from '.'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../../../atoms'

describe('MobileDrawingMenu', () => {
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => {
          snap.set(atomViewportWidth, 440)
        }}
      >
        <MobileDrawingMenu
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
