import { ChangeEvent } from 'react'
import TextFormDesktop from './TextFormDesktop'
import { useRecoilValue } from 'recoil'
import { atomNoteType } from '../atoms'
import ChecklistForm from './ChecklistForm'

interface IComponentProps {
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RenderNoteFormDesktop = (props: IComponentProps) => {
  const { handleNoteTextChange, handleNoteTitleChange } = props

  const noteType = useRecoilValue(atomNoteType)

  if (noteType === 'text') {
    return (
      <TextFormDesktop
        handleNoteTextChange={handleNoteTextChange}
        handleNoteTitleChange={handleNoteTitleChange}
      />
    )
  } else if (noteType === 'checklist') {
    return <ChecklistForm handleNoteTitleChange={handleNoteTitleChange} />
  } else return null
}

export default RenderNoteFormDesktop
