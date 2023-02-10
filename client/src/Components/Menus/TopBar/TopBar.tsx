import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomFilteredNotes,
  atomIsLoading,
  atomIsSearching,
  atomNotes,
  atomSearchValue,
  atomSelectedNoteIds,
  atomViewportWidth,
} from '../../../atoms'
import DesktopAppBar from './DesktopAppBar'
import MobileAppBar from './MobileAppBar'
import { MAIN_BREAKPOINT } from '../../../Constants'
import { getNotes } from '../../../Logic/LogicHelpers'
import SelectedNotesBar from './SelectedNotesBar'
import { IExistingNote } from '../../../types'

interface TopBarProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  editNotes: (editField: string, selectedNotes: IExistingNote[]) => void
}

const TopBar = (props: TopBarProps): JSX.Element => {
  const { setAuthenticated, editNotes } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** Array of selected note IDs */
  const selectedNoteIds = useRecoilValue(atomSelectedNoteIds)
  /** State setter to update the value that is typed into the search bar */
  const setSearchValue = useSetRecoilState(atomSearchValue)
  /** State setter to determine whether the search bar is being used */
  const setIsSearching = useSetRecoilState(atomIsSearching)
  /** State setter to determine whether notes are being loaded from the back end */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** Array of notes, filtered */
  const filteredNotes = useRecoilValue(atomFilteredNotes)

  /** Log out of the app */
  const logOut = () => {
    localStorage.setItem('userProfile', '')
    setAuthenticated(false)
    setNotes([])
  }

  /** Update search filter with whatever the user types into the search bar */
  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.target.value)
  }

  /** Reset the search filter */
  const clearSearch = () => {
    setIsSearching(false)
    setSearchValue('')
    getNotes(setIsLoading, setNotes)
  }

  /** Whether or not any notes are selected */
  const notesSelected = filteredNotes.some((note) =>
    selectedNoteIds.includes(note._id)
  )

  if (viewportWidth > MAIN_BREAKPOINT && !notesSelected) {
    return (
      <DesktopAppBar
        logOut={logOut}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
    )
  } else if (viewportWidth <= MAIN_BREAKPOINT && !notesSelected) {
    return (
      <MobileAppBar
        logOut={logOut}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
    )
  } else {
    return <SelectedNotesBar editNotes={editNotes} />
  }
}

export default TopBar
