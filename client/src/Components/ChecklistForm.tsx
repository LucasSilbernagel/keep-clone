import { ChangeEvent, useEffect } from 'react'
import {
  TextField,
  Grid,
  Divider,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Tooltip,
} from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  atomNewNote,
  atomNoteList,
  atomNoteBeingEdited,
  atomEditingID,
} from '../atoms'
import AddIcon from '@mui/icons-material/Add'
import cloneDeep from 'lodash.clonedeep'
import ClearIcon from '@mui/icons-material/Clear'
import CompletedItems from './CompletedItems'
import { nanoid } from 'nanoid'

interface IComponentProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ChecklistForm = (props: IComponentProps) => {
  const { handleNoteTitleChange } = props

  /** New note atom */
  const [newNote, setNewNote] = useRecoilState(atomNewNote)
  /** Array of checklist items for a note */
  const [noteList, setNoteList] = useRecoilState(atomNoteList)
  /** The ID of the note that is being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** The note that is being edited */
  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)

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
        return editedNote
      })
    } else {
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.list = noteList
        editedNote.userGoogleId = JSON.parse(
          window.localStorage.userProfile
        ).googleId
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

  const handleDeleteChecklistItem = (id: string) => {
    setNoteList((prevList) => {
      const newList = [...prevList]
      return newList.filter((item) => item.id !== id)
    })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          multiline
          placeholder="Title"
          onChange={handleNoteTitleChange}
          value={editingID ? noteBeingEdited.title : newNote.title}
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
          inputProps={{ style: { fontSize: '1.2rem' }, maxLength: 1000 }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
        />
      </Grid>
      <Grid item container xs={12}>
        <List sx={{ width: '100%', paddingBottom: 0 }} dense>
          <Divider />
          {noteList
            .filter((item) => !item.done)
            .map((item) => {
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
