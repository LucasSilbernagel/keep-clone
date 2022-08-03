import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import {
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
} from '@mui/material'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import React, { ChangeEvent, useRef, useEffect, KeyboardEvent } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomEditingID,
  atomNewNote,
  atomNoteBeingEdited,
  atomNoteList,
} from '../../../../../atoms'
import CompletedItems from '../CompletedItems'
import NoteTitleInput from '../../../NoteTitleInput'

interface ChecklistFormProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ChecklistForm: React.FC<ChecklistFormProps> = (
  props: ChecklistFormProps
) => {
  const { handleNoteTitleChange } = props

  /** State setter to update the new note atom */
  const setNewNote = useSetRecoilState(atomNewNote)
  /** Array of checklist items for a note */
  const [noteList, setNoteList] = useRecoilState(atomNoteList)
  /** The ID of the note that is being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** The note that is being edited */
  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)
  /** Refs for the checklist text inputs */
  const inputRefs = useRef<HTMLDivElement[]>([])

  /** When all checklist items have text, a new blank checklist item should be added to the list. */
  useEffect(() => {
    const noteListCopy = cloneDeep(noteList)
    if (noteList.every((listItem) => listItem.text.length > 0)) {
      noteListCopy.push({ text: '', done: false, id: nanoid() })
      setNoteList(noteListCopy)
    }
  }, [noteList, setNoteList])

  /** Update a note whenever its checklist contents change */
  useEffect(() => {
    if (editingID) {
      setNoteBeingEdited((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.list = noteList
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    } else {
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.list = noteList
        editedNote.userGoogleId = JSON.parse(
          localStorage.getItem('userProfile') || ''
        ).googleId
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    }
  }, [editingID, noteList, setNewNote, setNoteBeingEdited])

  /** Update the checklist being edited to that of the note being edited. */
  useEffect(() => {
    if (editingID) {
      setNoteList(noteBeingEdited.list)
    }
    // eslint-disable-next-line
  }, [editingID])

  /** Function called when the text input value changes for a checklist item */
  const handleListTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    setNoteList((prevList) => {
      const newList = [...prevList]
      return newList.map((item) => {
        if (item.id === id) {
          return {
            text: e.target.value,
            done: item.done,
            id: item.id,
          }
        }
        return item
      })
    })
  }

  /** Function called when a checklist item's checkbox is toggled */
  const handleListCheckboxChange = (id: string) => {
    setNoteList((prevList) => {
      const newList = [...prevList]
      return newList.map((item) => {
        if (item.id === id) {
          return {
            text: item.text,
            done: !item.done,
            id: item.id,
          }
        }
        return item
      })
    })
  }

  /** Function to delete a checklist item */
  const handleDeleteChecklistItem = (id: string) => {
    setNoteList((prevList) => {
      const newList = [...prevList]
      return newList.filter((item) => item.id !== id)
    })
  }

  /** When the enter key is pressed on the checklist, focus should move to the next item. */
  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    targetElem: { focus: () => void }
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (targetElem) {
        targetElem.focus()
      }
    }
  }

  return (
    <Grid container>
      <NoteTitleInput handleNoteTitleChange={handleNoteTitleChange} />
      <Grid item container xs={12}>
        <List sx={{ width: '100%', paddingBottom: 0 }} dense>
          <Divider />
          {noteList
            .filter((item) => !item.done)
            .map((item, index) => {
              return (
                <ListItem key={item.id} divider>
                  <Grid
                    item
                    container
                    alignContent="center"
                    justifyContent="center"
                    xs={1}
                  >
                    {item.text ? (
                      <Grid item>
                        <Checkbox
                          checked={item.done}
                          onClick={() => handleListCheckboxChange(item.id)}
                          data-testid="list-checkbox"
                        />
                      </Grid>
                    ) : (
                      <Grid item>
                        <AddIcon />
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      autoFocus={noteList.length === 1}
                      onKeyDown={(e) =>
                        handleKeyDown(
                          e,
                          inputRefs.current[
                            index ===
                            noteList.filter((item) => !item.done).length - 1
                              ? 0
                              : index + 1
                          ]
                        )
                      }
                      inputRef={(el) => (inputRefs.current[index] = el)}
                      multiline
                      placeholder="List item"
                      size="small"
                      onChange={(e) => handleListTextChange(e, item.id)}
                      value={item.text}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        paddingLeft: '0.2em',
                        maxHeight: '50vh',
                        overflowY: 'auto',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'transparent',
                          },
                          '&:hover fieldset': {
                            borderColor: 'transparent',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'transparent',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {item.text.length > 0 && (
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDeleteChecklistItem(item.id)}
                          aria-label="delete"
                          data-testid="delete-list-item"
                        >
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Grid>
                </ListItem>
              )
            })}
        </List>
        <CompletedItems
          handleListCheckboxChange={handleListCheckboxChange}
          handleDeleteChecklistItem={handleDeleteChecklistItem}
        />
      </Grid>
    </Grid>
  )
}

export default ChecklistForm
