import { ChangeEvent } from 'react'
import TextFormDesktop from '../NoteForms/TextForm/TextFormDesktop'
import { useRecoilValue } from 'recoil'
import { atomNoteType } from '../../atoms'
import { IExistingNote } from '../../types'
import ChecklistFormDesktop from '../NoteForms/ChecklistForm/ChecklistFormDesktop'

interface IComponentProps {
  noteBeingEdited: IExistingNote
  editingID: string
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RenderNoteFormDesktop = (props: IComponentProps) => {
  const {
    noteBeingEdited,
    editingID,
    handleNoteTextChange,
    handleNoteTitleChange,
  } = props

  const noteType = useRecoilValue(atomNoteType)

  if (noteType === 'text') {
    return (
      <TextFormDesktop
        handleNoteTextChange={handleNoteTextChange}
        handleNoteTitleChange={handleNoteTitleChange}
        noteBeingEdited={noteBeingEdited}
        editingID={editingID}
      />
    )
  } else if (noteType === 'checklist') {
    return (
      <ChecklistFormDesktop
        handleNoteTitleChange={handleNoteTitleChange}
        noteBeingEdited={noteBeingEdited}
        editingID={editingID}
      />
    )
  } else return null
}

export default RenderNoteFormDesktop
