import { ChangeEvent } from 'react'
import { styled } from '@mui/material/styles'
import { IconButton, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { atomIsSearching, atomSearchValue } from '../../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import CloseIcon from '@mui/icons-material/Close'

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

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

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

interface IComponentProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearSearch: () => void
}

const DesktopSearch = (props: IComponentProps): JSX.Element => {
  const { handleSearch, clearSearch } = props

  const [isSearching, setIsSearching] = useRecoilState(atomIsSearching)

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
      />
      <CloseIconWrapper>
        {isSearching ? (
          <IconButton color="inherit" onClick={clearSearch}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </CloseIconWrapper>
    </Search>
  )
}

export default DesktopSearch
