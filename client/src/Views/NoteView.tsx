import {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { Grid } from '@mui/material'
import NoteGrid from '../Components/NoteGrid'
import NoteList from '../Components/NoteList'
import DesktopAppBar from '../Components/AppBar/DesktopAppBar'
import MobileAppBar from '../Components/AppBar/MobileAppBar'
import {
  atomNewNote,
  atomViewportWidth,
  atomSearchValue,
  atomIsSearching,
  atomIsGridView,
  atomNoteList,
  atomIsLoading,
  atomNotes,
} from '../atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import axios from 'axios'
import NoteCreator from '../Components/NoteCreator'
import NoteModal from '../Components/NoteModal/NoteModal'
import { nanoid } from 'nanoid'
import { getNotes } from '../LogicHelpers'

interface IComponentProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  deleteNote: (id: string) => void
}

const NoteView = (props: IComponentProps): JSX.Element => {
  const { setAuthenticated, deleteNote } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** State setter to update the value that is typed into the search bar */
  const setSearchValue = useSetRecoilState(atomSearchValue)
  /** State setter to determine whether the search bar is being used */
  const setIsSearching = useSetRecoilState(atomIsSearching)
  /** Boolean to determine whether a new note is being created. */
  const [creatingNote, setCreatingNote] = useState(false)
  /** New note atom */
  const [newNote, setNewNote] = useRecoilState(atomNewNote)
  /** Boolean to determine whether notes are being displayed in a grid (or list) */
  const isGridView = useRecoilValue(atomIsGridView)
  /** State setter to update the array of checklist items on a note */
  const setNoteList = useSetRecoilState(atomNoteList)
  /** State setter to determine whether notes are being loaded from the back end */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)

  /** Display all saved notes when the page first loads */
  useEffect(() => {
    getNotes(setIsLoading, setNotes)
    // eslint-disable-next-line
  }, [])

  /** Log out of the app */
  const logOut = () => {
    localStorage.setItem('userProfile', '')
    setAuthenticated(false)
    setNotes([])
  }

  /** Save a new note to the database */
  const saveNewNote = () => {
    if (
      newNote.text ||
      newNote.title ||
      newNote.list.some((item) => item.text.length > 0)
    ) {
      axios
        .post('/api/notes', newNote)
        .then((res) => {
          if (res.data) {
            getNotes(setIsLoading, setNotes)
            setNewNote({
              text: '',
              title: '',
              list: [{ text: '', done: false, id: nanoid() }],
              userGoogleId: '',
              lastEdited: 0,
            })
            setNoteList([{ text: '', done: false, id: nanoid() }])
          }
        })
        .catch((err) => console.error(err))
    }
  }

  /** Function to finish creating a new note */
  const finishCreatingNote = () => {
    saveNewNote()
    setCreatingNote(false)
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

  return (
    <>
      <NoteModal
        saveNewNote={saveNewNote}
        finishCreatingNote={finishCreatingNote}
        deleteNote={deleteNote}
      />
      {creatingNote ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            position: 'fixed',
            zIndex: 10,
          }}
          onClick={finishCreatingNote}
        ></div>
      ) : null}
      {viewportWidth > 1011 ? (
        <DesktopAppBar
          logOut={logOut}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
      ) : (
        <MobileAppBar
          logOut={logOut}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
      )}
      <Grid container item>
        <Grid container item lg={12} justifyContent="center">
          <Grid
            item
            xs={10}
            sm={8}
            md={7}
            lg={5}
            xl={4}
            sx={{
              marginBottom: '2em',
              zIndex: 20,
            }}
          >
            <NoteCreator
              creatingNote={creatingNote}
              setCreatingNote={setCreatingNote}
              finishCreatingNote={finishCreatingNote}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          sx={viewportWidth > 1011 ? {} : { paddingBottom: '100px' }}
        >
          {isGridView ? (
            <NoteGrid deleteNote={deleteNote} />
          ) : (
            <NoteList deleteNote={deleteNote} />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default NoteView
