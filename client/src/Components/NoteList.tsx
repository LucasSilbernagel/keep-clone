import { Grid } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import NoteContent from './NoteContent'
import { IExistingNote } from '../Interfaces'

interface IComponentProps {
  notes: Array<IExistingNote>
  deleteNote: (id: string) => void
  getNotes: () => void
}

const NoteList = (props: IComponentProps) => {
  const { notes, deleteNote, getNotes } = props

  /** Display notes if there are any saved */
  if (notes.length > 0) {
    if (notes.length > 3) {
      return (
        <Grid
          container
          item
          lg={8}
          md={9}
          sm={10}
          xs={10}
          sx={{
            margin: '0 auto',
          }}
        >
          <Masonry spacing={2} columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
            {notes.map((note) => {
              return (
                <NoteContent
                  key={note._id}
                  note={note}
                  deleteNote={deleteNote}
                  getNotes={getNotes}
                />
              )
            })}
          </Masonry>
        </Grid>
      )
    } else {
      return (
        <Grid
          container
          item
          lg={8}
          md={9}
          sm={10}
          xs={10}
          sx={{
            margin: '0 auto',
          }}
        >
          <Grid container item spacing={2}>
            {notes.map((note) => {
              return (
                <NoteContent
                  key={note._id}
                  note={note}
                  deleteNote={deleteNote}
                  getNotes={getNotes}
                />
              )
            })}
          </Grid>
        </Grid>
      )
    }
  } else return null
}

export default NoteList
