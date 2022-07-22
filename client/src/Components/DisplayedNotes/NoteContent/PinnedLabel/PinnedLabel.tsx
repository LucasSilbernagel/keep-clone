import { Grid, Typography } from '@mui/material'
import React from 'react'

interface PinnedLabelProps {
  pinnedStatus?: 'Pinned' | 'Others'
}

const PinnedLabel: React.FC<PinnedLabelProps> = (props: PinnedLabelProps) => {
  const { pinnedStatus } = props

  if (pinnedStatus) {
    return (
      <Grid item sx={{ marginBottom: '1em', paddingLeft: '1em' }}>
        <Typography
          variant="caption"
          sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
        >
          {pinnedStatus}
        </Typography>
      </Grid>
    )
  } else return null
}

export default PinnedLabel
