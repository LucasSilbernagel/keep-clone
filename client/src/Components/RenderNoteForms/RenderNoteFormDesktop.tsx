import { ChangeEvent } from 'react'
import TextFormDesktop from '../NoteForms/TextForm/TextFormDesktop'
import { useRecoilValue } from 'recoil'
import { atomNoteType } from '../../atoms'
import ChecklistFormDesktop from '../NoteForms/ChecklistForm/ChecklistFormDesktop'

interface IComponentProps {
  editingID: string
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RenderNoteFormDesktop = (props: IComponentProps) => {
  const { editingID, handleNoteTextChange, handleNoteTitleChange } = props

  const noteType = useRecoilValue(atomNoteType)

  if (noteType === 'text') {
    return (
      <TextFormDesktop
        handleNoteTextChange={handleNoteTextChange}
        handleNoteTitleChange={handleNoteTitleChange}
        editingID={editingID}
      />
    )
  } else if (noteType === 'checklist') {
    return (
      <ChecklistFormDesktop
        handleNoteTitleChange={handleNoteTitleChange}
        editingID={editingID}
      />
    )
  } else return null
}

export default RenderNoteFormDesktop
