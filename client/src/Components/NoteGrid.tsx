import { Grid } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import NoteContent from './NoteContent'
import { useRecoilValue } from 'recoil'
import { atomViewportWidth, atomFilteredNotes } from '../atoms'

interface IComponentProps {
  getNotes: () => void
  editNote: (id: string) => void
}

const NoteGrid = (props: IComponentProps) => {
  const { getNotes, editNote } = props

  /** Saved notes, filtered */
  const filteredNotes = useRecoilValue(atomFilteredNotes)

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  /** Display filteredNotes if there are any saved */
  if (filteredNotes.length > 0) {
    if (filteredNotes.length < 3 && viewportWidth > 700) {
      return (
        <Grid
          container
          item
          md={8}
          sm={10}
          sx={{
            margin: '0 auto',
          }}
        >
          <Grid container item spacing={2}>
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
    } else if (filteredNotes.length === 3) {
      return (
        <Grid
          container
          item
          lg={8}
          sx={{
            margin: '0 auto',
            paddingLeft: { xs: '0.5em', sm: 'default' },
          }}
        >
          <Masonry spacing={2} columns={{ lg: 3, md: 3, sm: 2, xs: 2 }}>
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
          </Masonry>
        </Grid>
      )
    } else if (viewportWidth >= 1536 && filteredNotes.length === 4) {
      return (
        <Grid
          container
          item
          lg={8}
          sx={{
            margin: '0 auto',
          }}
        >
          <Masonry spacing={2} columns={{ lg: 4 }}>
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
          xs={12}
          sx={{
            margin: '0 auto',
            paddingLeft: { xs: '0.5em', sm: 'default' },
          }}
        >
          <Masonry spacing={2} columns={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }}>
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
          </Masonry>
        </Grid>
      )
    }
  } else return null
}

export default NoteGrid
