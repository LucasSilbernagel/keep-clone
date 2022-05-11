import { ChangeEvent } from 'react'
import NoteFormDesktop from './NoteFormDesktop'
import { useSetRecoilState } from 'recoil'
import { atomNewNote } from '../../atoms'

interface IComponentProps {
  finishCreatingNote: () => void
}

const NoteFormContainer = (props: IComponentProps) => {
  const { finishCreatingNote } = props

  const setNewNote = useSetRecoilState(atomNewNote)

  /** Keep track of the new note text as the user types in the text field */
  const handleNoteTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote({
      text: e.target.value,
      userGoogleId: JSON.parse(window.localStorage.userProfile).googleId,
    })
  }

  return (
    <NoteFormDesktop
      handleNoteTextChange={handleNoteTextChange}
      finishCreatingNote={finishCreatingNote}
    />
  )
}

export default NoteFormContainer
