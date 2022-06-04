import { ChangeEvent } from 'react'
import NoteFormDesktop from './NoteFormDesktop'
import NoteFormMobile from './NoteFormMobile'
import { useRecoilValue } from 'recoil'
import { atomViewportWidth } from '../../atoms'
import { IExistingNote } from '../../Interfaces'

interface IComponentProps {
  noteBeingEdited: IExistingNote
  editingID: string
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const NoteFormContainer = (props: IComponentProps) => {
  const {
    noteBeingEdited,
    editingID,
    handleNoteTextChange,
    handleNoteTitleChange,
  } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  if (viewportWidth > 1011) {
    return (
      <NoteFormDesktop
        handleNoteTextChange={handleNoteTextChange}
        handleNoteTitleChange={handleNoteTitleChange}
        noteBeingEdited={noteBeingEdited}
        editingID={editingID}
      />
    )
  } else {
    return (
      <NoteFormMobile
        handleNoteTextChange={handleNoteTextChange}
        handleNoteTitleChange={handleNoteTitleChange}
        noteBeingEdited={noteBeingEdited}
        editingID={editingID}
      />
    )
  }
}

export default NoteFormContainer
