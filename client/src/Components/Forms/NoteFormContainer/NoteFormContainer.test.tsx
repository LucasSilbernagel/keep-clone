import { render, screen, fireEvent } from '@testing-library/react'
import NoteFormContainer from '.'
import { RecoilRoot } from 'recoil'
import {
  atomNoteBeingEdited,
  atomEditingID,
  atomNoteType,
} from '../../../atoms'
import { mockNotes } from '../../../DataHelpers'

describe('NoteFormContainer', () => {
  const finishCreatingNote = jest.fn()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initTextFormState = (snap: any) => {
    snap.set(atomNoteBeingEdited, mockNotes[0])
    snap.set(atomEditingID, mockNotes[0]._id)
    snap.set(atomNoteType, 'text')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initChecklistFormState = (snap: any) => {
    snap.set(atomNoteBeingEdited, mockNotes[1])
    snap.set(atomEditingID, mockNotes[1]._id)
    snap.set(atomNoteType, 'checklist')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initDrawingFormState = (snap: any) => {
    snap.set(atomNoteBeingEdited, mockNotes[2])
    snap.set(atomEditingID, mockNotes[2]._id)
    snap.set(atomNoteType, 'drawing')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initRecordingFormState = (snap: any) => {
    snap.set(atomNoteBeingEdited, mockNotes[3])
    snap.set(atomEditingID, mockNotes[3]._id)
    snap.set(atomNoteType, 'recording')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initImageFormState = (snap: any) => {
    snap.set(atomNoteBeingEdited, mockNotes[4])
    snap.set(atomEditingID, mockNotes[4]._id)
    snap.set(atomNoteType, 'image')
  }

  test('renders text form outside modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initTextFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={false}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByTestId('text-input')).toBeInTheDocument()
    expect(screen.getByText('Note text')).toBeInTheDocument()
    expect(screen.getByText('Note title')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('close-button'))
    expect(finishCreatingNote).toHaveBeenCalledTimes(1)
  })

  test('renders text form in modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initTextFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={true}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByTestId('text-input')).toBeInTheDocument()
    expect(screen.getByText('Note text')).toBeInTheDocument()
    expect(screen.getByText('Note title')).toBeInTheDocument()
  })

  test('renders checklist form outside modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initChecklistFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={false}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText('List item')[0]).toBeInTheDocument()
    expect(screen.getByText('second item')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('close-button'))
    expect(finishCreatingNote).toHaveBeenCalledTimes(1)
  })

  test('renders checklist form in modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initChecklistFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={true}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText('List item')[0]).toBeInTheDocument()
    expect(screen.getByText('second item')).toBeInTheDocument()
  })

  test('renders drawing form outside modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initDrawingFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={false}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByText('My drawing')).toBeInTheDocument()
    expect(screen.getByAltText('drawing')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('close-button'))
    expect(finishCreatingNote).toHaveBeenCalledTimes(1)
  })

  test('renders drawing form in modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initDrawingFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={true}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByText('My drawing')).toBeInTheDocument()
    expect(screen.getByAltText('drawing')).toBeInTheDocument()
  })

  test('renders recording form outside modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initRecordingFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={false}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByText('My recording')).toBeInTheDocument()
    expect(screen.getByText('0:0:12')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('close-button'))
    expect(finishCreatingNote).toHaveBeenCalledTimes(1)
  })

  test('renders recording form in modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initRecordingFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={true}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByText('My recording')).toBeInTheDocument()
    expect(screen.getByText('0:0:12')).toBeInTheDocument()
  })

  test('renders image form outside modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initImageFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={false}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByText('My photo')).toBeInTheDocument()
    expect(screen.getByAltText('my upload')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('close-button'))
    expect(finishCreatingNote).toHaveBeenCalledTimes(1)
  })

  test('renders image form in modal', () => {
    render(
      <RecoilRoot initializeState={(snap) => initImageFormState(snap)}>
        <NoteFormContainer
          finishCreatingNote={finishCreatingNote}
          inModal={true}
        />
      </RecoilRoot>
    )
    expect(screen.getByTestId('pin-button')).toBeInTheDocument()
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
    expect(screen.getByText('My photo')).toBeInTheDocument()
    expect(screen.getByAltText('my upload')).toBeInTheDocument()
  })
})
