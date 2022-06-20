import { ChangeEvent } from 'react'
import TextFormDesktop from './TextFormDesktop'
import { useRecoilValue } from 'recoil'
import { atomNoteType } from '../atoms'
import ChecklistForm from './ChecklistForm'

interface RenderNoteFormDesktopProps {
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RenderNoteFormDesktop = (props: RenderNoteFormDesktopProps) => {
  const { handleNoteTextChange, handleNoteTitleChange } = props

  /** The type of note being edited/created */
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
