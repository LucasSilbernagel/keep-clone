import { Grid } from '@mui/material'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomEditingID,
  atomIsLoading,
  atomNewNote,
  atomNoteBeingEdited,
  atomNoteCopy,
  atomNoteList,
  atomNotes,
  atomSelectedNoteIds,
  atomIsDrawingActive,
} from '../../atoms'
import DrawingContainer from '../../Components/Forms/NoteFormContainer/Drawing/DrawingContainer'
import NoteCreator from '../../Components/Menus/NoteCreator'
import NoteModal from '../../Components/NoteModal'
import Notes from '../../Components/DisplayedNotes/Notes'
import TopBar from '../../Components/Menus/TopBar'
import { getNotes } from '../../Logic/LogicHelpers'

interface NoteViewProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  deleteNote: (id: string) => void
}

const NoteView = (props: NoteViewProps): JSX.Element => {
  const { setAuthenticated, deleteNote } = props

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
  /** Boolean to determine whether the drawing container is open */
  const isDrawingActive = useRecoilValue(atomIsDrawingActive)
  /** Array of selected note IDs */
  const [selectedNoteIds, setSelectedNoteIds] =
    useRecoilState(atomSelectedNoteIds)
  /** The note being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** State setter to update the note copy */
  const setNoteCopy = useSetRecoilState(atomNoteCopy)

  /** Display all saved notes when the page first loads */
  useEffect(() => {
    getNotes(setIsLoading, setNotes)
    // eslint-disable-next-line
  }, [])

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

  /** Edit selected notes */
  const editNotes = (editField: string, ids: string[]) => {
    axios({
      url: `/api/notes/${editField}`,
      method: 'post',
      data: { ids },
    })
      .then((res) => {
        if (res.data) {
          getNotes(setIsLoading, setNotes)
        }
      })
      .catch((err) => console.error(err))
  }

  /** Function to finish creating a new note */
  const finishCreatingNote = () => {
    saveNewNote()
    setCreatingNote(false)
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
      {selectedNoteIds.length > 0 && (
        /** Invisible background rendered when the note multi-select feature is being used. */
        /** Empties the selected notes array when clicked. */
        <div
          style={{
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            position: 'fixed',
            zIndex: 70,
          }}
          onClick={() => setSelectedNoteIds([])}
        ></div>
      )}
      <DrawingContainer />
      {!isDrawingActive && (
        <>
          <TopBar setAuthenticated={setAuthenticated} editNotes={editNotes} />
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
      )}
    </>
  )
}

export default NoteView
