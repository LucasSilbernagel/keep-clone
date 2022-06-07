import { ChangeEvent } from 'react'
import { TextField, Grid, Divider, List, ListItem } from '@mui/material'
import { useRecoilValue, useRecoilState } from 'recoil'
import { atomNewNote, atomNoteList, atomNoteBeingEdited } from '../../../atoms'
import AddIcon from '@mui/icons-material/Add'
import { handleChecklistTextChange } from '../../../LogicHelpers'

interface IComponentProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  editingID: string
}

const ChecklistFormDesktop = (props: IComponentProps) => {
  const { handleNoteTitleChange, editingID } = props

  const [newNote, setNewNote] = useRecoilState(atomNewNote)

  const noteList = useRecoilValue(atomNoteList)

  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)

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
                  <Grid item>
                    <AddIcon />
                  </Grid>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    autoFocus
                    multiline
                    placeholder="List item"
                    size="small"
                    onChange={(e) =>
                      handleChecklistTextChange(
                        e,
                        index,
                        editingID,
                        noteBeingEdited,
                        setNoteBeingEdited,
                        newNote,
                        setNewNote
                      )
                    }
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
              </ListItem>
            )
          })}
        </List>
      </Grid>
    </Grid>
  )
}

export default ChecklistFormDesktop
