import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import DesktopAppBar from '../Components/DesktopAppBar'
import MobileAppBar from '../Components/MobileAppBar'
import {
  atomViewportWidth,
  atomSearchValue,
  atomIsSearching,
  atomIsLoading,
  atomNotes,
} from '../atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getNotes } from '../LogicHelpers'
import { MAIN_BREAKPOINT } from '../Constants'

interface TopBarProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
}

const TopBar = (props: TopBarProps): JSX.Element => {
  const { setAuthenticated } = props

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

  if (viewportWidth > MAIN_BREAKPOINT) {
    return (
      <DesktopAppBar
        logOut={logOut}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
    )
  } else {
    return (
      <MobileAppBar
        logOut={logOut}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
    )
  }
}

export default TopBar
