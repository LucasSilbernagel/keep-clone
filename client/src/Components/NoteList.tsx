import { Grid } from '@mui/material'
import NoteContent from './NoteContent'
import { IExistingNote } from '../Interfaces'

interface IComponentProps {
  filteredNotes: Array<IExistingNote>
  getNotes: () => void
  editNote: (id: string) => void
}

const NoteList = (props: IComponentProps) => {
  const { filteredNotes, getNotes, editNote } = props

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
              <NoteContent
                key={note._id}
                note={note}
                getNotes={getNotes}
                editNote={editNote}
              />
            )
          })}
        </Grid>
      </Grid>
    )
  } else return null
}

export default NoteList
