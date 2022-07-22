import { Grid } from '@mui/material'
import React from 'react'
import { IExistingNote } from '../../../../types'
import NoteContent from '../../NoteContent'
import PinnedLabel from '../../NoteContent/PinnedLabel'

interface NoteListProps {
  deleteNote: (id: string) => void
  notes: IExistingNote[]
  pinnedStatus?: 'Pinned' | 'Others'
}

const NoteList: React.FC<NoteListProps> = (props: NoteListProps) => {
  const { deleteNote, notes, pinnedStatus } = props

  /** Display filteredNotes if there are any saved */
  if (notes.length > 0) {
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
        <PinnedLabel pinnedStatus={pinnedStatus} />
        <Grid container item xs={12}>
          {notes.map((note) => {
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
