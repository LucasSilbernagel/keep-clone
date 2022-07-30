import { render, screen } from '@testing-library/react'
import CompletedItems from '.'
import { RecoilRoot } from 'recoil'
import { mockNotes } from '../../../../../DataHelpers'
import { atomNoteList } from '../../../../../atoms'

describe('CompletedItems', () => {
  test('renders', () => {
    render(
      <RecoilRoot
        initializeState={(snap) => snap.set(atomNoteList, mockNotes[1].list)}
      >
        <CompletedItems
          handleListCheckboxChange={jest.fn()}
          handleDeleteChecklistItem={jest.fn()}
        />
      </RecoilRoot>
    )
    expect(screen.getByText('1 Completed item')).toBeInTheDocument()
    expect(screen.getByText('first item')).toBeInTheDocument()
    expect(screen.getByTestId('delete-list-item-button')).toBeInTheDocument()
  })
})
