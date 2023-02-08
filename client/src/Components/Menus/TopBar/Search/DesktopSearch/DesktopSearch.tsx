import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputBase, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChangeEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { atomIsSearching, atomSearchValue } from '../../../../../atoms'

/** The search bar */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(10),
    width: 'auto',
  },
  background: theme.palette.primary.dark,
}))

/** Wrapper around the search icon */
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

/** Base input component, with custom styling */
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}))

interface DesktopSearchProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearSearch: () => void
}

const DesktopSearch = (props: DesktopSearchProps): JSX.Element => {
  const { handleSearch, clearSearch } = props

  /** Boolean that determines whether the search bar is being used */
  const [isSearching, setIsSearching] = useRecoilState(atomIsSearching)
  /** The value that is typed into the search bar */
  const searchValue = useRecoilValue(atomSearchValue)

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color="secondary" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => handleSearch(e)}
        onFocus={() => setIsSearching(true)}
        value={searchValue}
        data-testid="search-field"
      />
      <CloseIconWrapper>
        {isSearching ? (
          <Tooltip title="Clear search">
            <span>
              <IconButton
                color="inherit"
                onClick={clearSearch}
                aria-label="clear search"
                data-testid="clear-search-button"
              >
                <CloseIcon />
              </IconButton>
            </span>
          </Tooltip>
        ) : null}
      </CloseIconWrapper>
    </Search>
  )
}

export default DesktopSearch
