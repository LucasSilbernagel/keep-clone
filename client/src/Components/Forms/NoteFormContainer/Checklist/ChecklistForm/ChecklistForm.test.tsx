import { render, screen } from '@testing-library/react'
import ChecklistForm from '.'
import { RecoilRoot } from 'recoil'

beforeEach(() =>
  localStorage.setItem(
    'userProfile',
    JSON.stringify({
      imageUrl: 'test',
      name: 'Test User',
      email: 'test@email.com',
      googleId: '123',
    })
  )
)

afterEach(() => localStorage.setItem('userProfile', JSON.stringify({})))

describe('ChecklistForm', () => {
  test('renders', () => {
    render(
      <RecoilRoot>
        <ChecklistForm handleNoteTitleChange={jest.fn()} />
      </RecoilRoot>
    )
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument()
  })
})
