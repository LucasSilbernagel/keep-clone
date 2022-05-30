import { ChangeEvent, useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import NoteGrid from '../Components/NoteGrid'
import NoteList from '../Components/NoteList'
import { IExistingNote } from '../Interfaces'
import DesktopAppBar from '../Components/AppBar/DesktopAppBar'
import MobileAppBar from '../Components/AppBar/MobileAppBar'
import {
  atomNewNote,
  atomViewportWidth,
  atomSearchValue,
  atomIsSearching,
  atomIsGridView,
} from '../atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import axios from 'axios'
import NoteCreator from '../Components/NoteCreator'
import NoteModal from '../Components/NoteModal'

interface IComponentProps {
  getNotes: () => void
  filteredNotes: Array<IExistingNote>
  editNote: (id: string) => void
  editingID: string
  saveNote: () => void
  handleNoteTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  noteBeingEdited: IExistingNote
  logOut: () => void
}

const NoteView = (props: IComponentProps): JSX.Element => {
  const {
    getNotes,
    filteredNotes,
    editNote,
    editingID,
    saveNote,
    handleNoteTextChange,
    noteBeingEdited,
    logOut,
  } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  const setSearchValue = useSetRecoilState(atomSearchValue)

  const setIsSearching = useSetRecoilState(atomIsSearching)

  const [creatingNote, setCreatingNote] = useState(false)

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  const isGridView = useRecoilValue(atomIsGridView)

  /** Display all saved notes when the page first loads */
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

  /** Save the new note to the database */
  const saveNewNote = () => {
    if (newNote.text) {
      axios
        .post('/api/notes', newNote)
        .then((res) => {
          if (res.data) {
            getNotes()
            setNewNote({ text: '', userGoogleId: '', lastEdited: 0 })
          }
        })
        .catch((err) => console.error(err))
    }
  }

  const finishCreatingNote = () => {
    if (newNote.text) {
      saveNewNote()
    }
    setCreatingNote(false)
  }

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.target.value)
  }

  const clearSearch = () => {
    setIsSearching(false)
    setSearchValue('')
  }

  return (
    <>
      <NoteModal
        getNotes={getNotes}
        note={noteBeingEdited}
        saveNewNote={saveNewNote}
        noteBeingEdited={noteBeingEdited}
        editingID={editingID}
        saveNote={saveNote}
        handleNoteTextChange={handleNoteTextChange}
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
          getNotes={getNotes}
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
              noteBeingEdited={noteBeingEdited}
              editingID={editingID}
              handleNoteTextChange={handleNoteTextChange}
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
            <NoteGrid
              filteredNotes={filteredNotes}
              getNotes={getNotes}
              editNote={editNote}
            />
          ) : (
            <NoteList
              filteredNotes={filteredNotes}
              getNotes={getNotes}
              editNote={editNote}
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default NoteView
