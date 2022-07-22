import { Checkbox, Grid, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { IExistingNote } from '../../../../types'
import CompletedListSummary from '../../../Forms/NoteFormContainer/Checklist/CompletedListSummary'

interface NoteContentChecklistProps {
  note: IExistingNote
}

const NoteContentChecklist: React.FC<NoteContentChecklistProps> = (
  props: NoteContentChecklistProps
) => {
  const { note } = props

  return (
    <>
      <List sx={{ width: '100%', paddingBottom: 0 }} dense>
        {note.list
          .filter((item) => !item.done && item.text.length > 0)
          .map((item) => {
            return (
              <ListItem key={item.id}>
                <Grid container justifyContent="space-between">
                  <Grid
                    item
                    container
                    alignContent="center"
                    justifyContent="center"
                    xs={1}
                  >
                    <Grid item>
                      <Checkbox checked={item.done} disabled />
                    </Grid>
                  </Grid>
                  <Grid item container xs={10} alignItems="center">
                    <Grid item xs={12}>
                      <Typography
                        noWrap
                        sx={{
                          fontSize: '0.9rem',
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
            )
          })}
      </List>
      {note.list.filter((item) => item.done && item.text.length > 0).length >
        0 && <CompletedListSummary note={note} />}
    </>
  )
}

export default NoteContentChecklist
