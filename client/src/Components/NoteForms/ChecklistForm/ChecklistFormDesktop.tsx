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
import { BLANK_LIST_ITEM } from '../../../Constants'
import ClearIcon from '@mui/icons-material/Clear'

interface IComponentProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  editingID: string
}

const ChecklistFormDesktop = (props: IComponentProps) => {
  const { handleNoteTitleChange, editingID } = props

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  const [noteList, setNoteList] = useRecoilState(atomNoteList)

  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)

  useEffect(() => {
    const noteListCopy = cloneDeep(noteList)
    if (noteList.every((listItem) => listItem.text.length > 0)) {
      noteListCopy.push(BLANK_LIST_ITEM)
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
    index: number
  ) => {
    setNoteList((prevList) => {
      const newList = [...prevList]
      newList[index] = {
        done: noteList[index].done,
        text: e.target.value,
      }
      return newList
    })
  }

  const handleListCheckboxChange = (index: number) => {
    setNoteList((prevList) => {
      const newList = [...prevList]
      newList[index] = {
        done: !noteList[index].done,
        text: noteList[index].text,
      }
      return newList
    })
  }

  const handleDelete = (index: number) => {
    setNoteList((prevList) => {
      const newList = [...prevList]
      if (newList.length > 1) {
        return newList.filter((item) => newList.indexOf(item) !== index)
      } else {
        newList[index] = {
          done: noteList[index].done,
          text: '',
        }
        return newList
      }
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
        <List sx={{ width: '100%' }} dense>
          <Divider />
          {noteList.map((listItem, index) => {
            return (
              <ListItem key={index} divider>
                <Grid
                  item
                  container
                  alignContent="center"
                  justifyContent="center"
                  xs={1}
                >
                  <Grid padding="checkbox" item>
                    {listItem.text ? (
                      <Checkbox
                        checked={listItem.done}
                        onClick={() => handleListCheckboxChange(index)}
                      />
                    ) : (
                      <AddIcon />
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    autoFocus={index === 0}
                    multiline
                    placeholder="List item"
                    size="small"
                    onChange={(e) => handleListTextChange(e, index)}
                    value={listItem.text}
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
                  {listItem.text.length > 0 && (
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(index)}
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
      </Grid>
    </Grid>
  )
}

export default ChecklistFormDesktop
