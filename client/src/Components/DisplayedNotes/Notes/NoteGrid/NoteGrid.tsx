import Masonry from '@mui/lab/Masonry'
import { Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import React from 'react'
import { atomViewportWidth } from '../../../../atoms'
import { IExistingNote } from '../../../../types'
import NoteContent from '../../NoteContent'
import PinnedLabel from '../../NoteContent/PinnedLabel'

interface NoteGridProps {
  deleteNote: (id: string) => void
  notes: IExistingNote[]
  pinnedStatus?: 'Pinned' | 'Others'
}

const NoteGrid: React.FC<NoteGridProps> = (props: NoteGridProps) => {
  const { deleteNote, notes, pinnedStatus } = props

  /** The width of the viewport/window, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  /** Function to return the content for each note */
  const getNoteContent = (note: IExistingNote) => {
    return <NoteContent key={note._id} note={note} deleteNote={deleteNote} />
  }

  /** Display filteredNotes if there are any saved */
  if (notes.length > 0) {
    if (notes.length < 3 && viewportWidth > 700) {
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
          <PinnedLabel pinnedStatus={pinnedStatus} />
          <Grid container item spacing={2}>
            {notes.map((note) => {
              return getNoteContent(note)
            })}
          </Grid>
        </Grid>
      )
    } else if (notes.length === 3) {
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
          <PinnedLabel pinnedStatus={pinnedStatus} />
          <Masonry spacing={2} columns={{ lg: 3, md: 3, sm: 2, xs: 2 }}>
            {notes.map((note) => {
              return getNoteContent(note)
            })}
          </Masonry>
        </Grid>
      )
    } else if (viewportWidth >= 1536 && notes.length === 4) {
      return (
        <Grid
          container
          item
          lg={8}
          sx={{
            margin: '0 auto',
          }}
        >
          <PinnedLabel pinnedStatus={pinnedStatus} />
          <Masonry spacing={2} columns={{ lg: 4 }}>
            {notes.map((note) => {
              return getNoteContent(note)
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
          <PinnedLabel pinnedStatus={pinnedStatus} />
          <Masonry spacing={2} columns={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }}>
            {notes.map((note) => {
              return getNoteContent(note)
            })}
          </Masonry>
        </Grid>
      )
    }
  } else return null
}

export default NoteGrid
