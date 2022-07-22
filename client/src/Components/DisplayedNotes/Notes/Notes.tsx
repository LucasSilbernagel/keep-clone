import { Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'

import {
  atomFilteredNotes,
  atomIsGridView,
  atomViewportWidth,
} from '../../../atoms'
import NoteGrid from './NoteGrid'
import NoteList from './NoteList'
import { MAIN_BREAKPOINT } from '../../../Constants'

interface NotesProps {
  deleteNote: (id: string) => void
}

const Notes = (props: NotesProps): JSX.Element => {
  const { deleteNote } = props

  /** Array of notes, filtered */
  const filteredNotes = useRecoilValue(atomFilteredNotes)
  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)
  /** Boolean to determine whether notes are being displayed in a grid (or list) */
  const isGridView = useRecoilValue(atomIsGridView)

  if (!filteredNotes.some((note) => note.isPinned)) {
    return (
      <Grid
        item
        container
        sx={viewportWidth > MAIN_BREAKPOINT ? {} : { paddingBottom: '100px' }}
      >
        {isGridView ? (
          <NoteGrid deleteNote={deleteNote} notes={filteredNotes} />
        ) : (
          <NoteList deleteNote={deleteNote} notes={filteredNotes} />
        )}
      </Grid>
    )
  } else {
    return (
      <>
        <Grid item container sx={{ paddingBottom: '2em' }}>
          {isGridView ? (
            <NoteGrid
              deleteNote={deleteNote}
              notes={filteredNotes.filter((note) => note.isPinned)}
              pinnedStatus={'Pinned'}
            />
          ) : (
            <NoteList
              deleteNote={deleteNote}
              notes={filteredNotes.filter((note) => note.isPinned)}
              pinnedStatus={'Pinned'}
            />
          )}
        </Grid>
        <Grid
          item
          container
          sx={viewportWidth > MAIN_BREAKPOINT ? {} : { paddingBottom: '100px' }}
        >
          {isGridView ? (
            <NoteGrid
              deleteNote={deleteNote}
              notes={filteredNotes.filter((note) => !note.isPinned)}
              pinnedStatus={'Others'}
            />
          ) : (
            <NoteList
              deleteNote={deleteNote}
              notes={filteredNotes.filter((note) => !note.isPinned)}
              pinnedStatus={'Others'}
            />
          )}
        </Grid>
      </>
    )
  }
}

export default Notes
