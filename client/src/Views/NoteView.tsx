import {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { Grid } from '@mui/material'
import DesktopAppBar from '../Components/DesktopAppBar'
import MobileAppBar from '../Components/MobileAppBar'
import {
  atomNewNote,
  atomViewportWidth,
  atomSearchValue,
  atomIsSearching,
  atomNoteList,
  atomIsLoading,
  atomNotes,
  atomNoteCopy,
  atomEditingID,
  atomNoteBeingEdited,
} from '../atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import axios from 'axios'
import NoteCreator from '../Components/NoteCreator'
import NoteModal from '../Components/NoteModal'
import { nanoid } from 'nanoid'
import { getNotes } from '../LogicHelpers'
import { MAIN_BREAKPOINT } from '../Constants'
import DrawingContainer from '../Components/DrawingContainer'
import Notes from '../Components/Notes'

interface NoteViewProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  deleteNote: (id: string) => void
}

const NoteView = (props: NoteViewProps): JSX.Element => {
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
  /** State setter to update the array of checklist items on a note */
  const setNoteList = useSetRecoilState(atomNoteList)
  /** State setter to determine whether notes are being loaded from the back end */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** The ID of the note being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** The note being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** State setter to update the note copy */
  const setNoteCopy = useSetRecoilState(atomNoteCopy)

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

  /** Create a copy of the note that is being created or edited */
  useEffect(() => {
    if (editingID) {
      setNoteCopy(noteBeingEdited)
    } else {
      setNoteCopy(newNote)
    }
  }, [editingID, newNote, noteBeingEdited, setNoteCopy])

  /** Save a new note to the database */
  const saveNewNote = () => {
    if (
      newNote.text ||
      newNote.title ||
      newNote.list.some((item) => item.text.length > 0) ||
      newNote.drawing ||
      newNote.recording ||
      newNote.image
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
              drawing: '',
              drawingImage: '',
              recording: '',
              recordingDuration: '',
              image: '',
              isPinned: false,
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
        creatingNote={creatingNote}
      />
      {creatingNote ? (
        /** Invisible background rendered when the desktop NoteCreator is being used. */
        /** Triggers the finishCreatingNote function when clicked. */
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
      <DrawingContainer />
      {viewportWidth > MAIN_BREAKPOINT ? (
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
        <Notes deleteNote={deleteNote} />
      </Grid>
    </>
  )
}

export default NoteView
