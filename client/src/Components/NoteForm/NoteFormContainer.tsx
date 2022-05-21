import { ChangeEvent } from 'react'
import NoteFormDesktop from './NoteFormDesktop'
import NoteFormMobile from './NoteFormMobile'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { atomNewNote, atomViewportWidth } from '../../atoms'

interface IComponentProps {
  finishCreatingNote: () => void
}

const NoteFormContainer = (props: IComponentProps) => {
  const { finishCreatingNote } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const setNewNote = useSetRecoilState(atomNewNote)

  /** Keep track of the new note text as the user types in the text field */
  const handleNoteTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote({
      text: e.target.value,
      userGoogleId: JSON.parse(window.localStorage.userProfile).googleId,
    })
  }

  if (viewportWidth > 1011) {
    return (
      <NoteFormDesktop
        handleNoteTextChange={handleNoteTextChange}
        finishCreatingNote={finishCreatingNote}
      />
    )
  } else {
    return <NoteFormMobile handleNoteTextChange={handleNoteTextChange} />
  }
}

export default NoteFormContainer
