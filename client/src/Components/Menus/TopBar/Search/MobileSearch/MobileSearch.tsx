import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton, InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChangeEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { atomIsSearching, atomSearchValue } from '../../../../../atoms'

/** The search bar */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
  padding: '0.6em 0em',
  background: theme.palette.primary.dark,
}))

/** Wrapper around the back icon */
const BackIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  zIndex: 10,
}))

/** Wrapper around the close icon */
const CloseIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

/** Base input component with custom styling */
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: '4em',
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

interface MobileSearchProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearSearch: () => void
}

const MobileSearch = (props: MobileSearchProps): JSX.Element => {
  const { handleSearch, clearSearch } = props

  /** Boolean that determines whether the search bar is being used */
  const [isSearching, setIsSearching] = useRecoilState(atomIsSearching)
  /** The value typed into the search bar */
  const searchValue = useRecoilValue(atomSearchValue)

  return (
    <Search>
      <BackIconWrapper>
        <IconButton onClick={clearSearch} aria-label="back">
          <ArrowBackIcon color="secondary" />
        </IconButton>
      </BackIconWrapper>
      <StyledInputBase
        autoFocus
        placeholder="Search your notes"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => handleSearch(e)}
        onFocus={() => setIsSearching(true)}
        value={searchValue}
      />
      <CloseIconWrapper>
        {isSearching ? (
          <IconButton
            color="inherit"
            onClick={clearSearch}
            aria-label="clear search"
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </CloseIconWrapper>
    </Search>
  )
}

export default MobileSearch
