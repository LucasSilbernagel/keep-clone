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
import { useRecoilState } from 'recoil'
import { atomNewNote, atomNoteList, atomNoteBeingEdited } from '../../../atoms'
import AddIcon from '@mui/icons-material/Add'
import cloneDeep from 'lodash.clonedeep'
import ClearIcon from '@mui/icons-material/Clear'
import CompletedItems from './CompletedItems'
import { nanoid } from 'nanoid'

interface IComponentProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  editingID: string
}

const ChecklistForm = (props: IComponentProps) => {
  const { handleNoteTitleChange, editingID } = props

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  const [noteList, setNoteList] = useRecoilState(atomNoteList)

  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)

  useEffect(() => {
    const noteListCopy = cloneDeep(noteList)
    if (noteList.every((listItem) => listItem.text.length > 0)) {
      noteListCopy.push({ text: '', done: false, id: nanoid() })
      setNoteList(noteListCopy)
    }
  }, [noteList, setNoteList])

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
        return editedNote
      })
    }
  }, [editingID, noteList, setNewNote, setNoteBeingEdited])

  useEffect(() => {
    if (editingID) {
      setNoteList(noteBeingEdited.list)
    }
    // eslint-disable-next-line
  }, [editingID])

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

  const handleDelete = (id: string) => {
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
                    <Grid padding="checkbox" item>
                      {item.text ? (
                        <Checkbox
                          checked={item.done}
                          onClick={() => handleListCheckboxChange(item.id)}
                        />
                      ) : (
                        <AddIcon />
                      )}
                    </Grid>
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
                          onClick={() => handleDelete(item.id)}
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
          handleDelete={handleDelete}
        />
      </Grid>
    </Grid>
  )
}

export default ChecklistForm
