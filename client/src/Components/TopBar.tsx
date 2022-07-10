import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import DesktopAppBar from '../Components/DesktopAppBar'
import MobileAppBar from '../Components/MobileAppBar'
import {
  atomViewportWidth,
  atomSearchValue,
  atomIsSearching,
  atomIsLoading,
  atomNotes,
  atomFilteredNotes,
} from '../atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getNotes } from '../LogicHelpers'
import { MAIN_BREAKPOINT } from '../Constants'
import SelectedNotesBar from './SelectedNotesBar'

interface TopBarProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  editNotes: (editField: string, ids: string[]) => void
}

const TopBar = (props: TopBarProps): JSX.Element => {
  const { setAuthenticated, editNotes } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
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
  const notesSelected =
    filteredNotes.filter((note) => note.isSelected).length > 0

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
