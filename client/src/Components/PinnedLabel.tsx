import { Grid, Typography } from '@mui/material'

interface PinnedLabelProps {
  pinnedStatus?: 'Pinned' | 'Others'
}

const PinnedLabel = (props: PinnedLabelProps) => {
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
