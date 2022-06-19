import { Grid } from '@mui/material'
import NoteContent from './NoteContent'
import { useRecoilValue } from 'recoil'
import { atomFilteredNotes } from '../atoms'

interface IComponentProps {
  deleteNote: (id: string) => void
}

const NoteList = (props: IComponentProps) => {
  const { deleteNote } = props

  /** Saved notes, filtered */
  const filteredNotes = useRecoilValue(atomFilteredNotes)

  /** Display filteredNotes if there are any saved */
  if (filteredNotes.length > 0) {
    return (
      <Grid
        container
        item
        xs={11}
        md={7}
        lg={5}
        xl={4}
        sx={{
          margin: '0 auto',
        }}
      >
        <Grid container item xs={12}>
          {filteredNotes.map((note) => {
            return (
              <NoteContent key={note._id} note={note} deleteNote={deleteNote} />
            )
          })}
        </Grid>
      </Grid>
    )
  } else return null
}

export default NoteList
