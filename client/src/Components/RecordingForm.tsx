import { ChangeEvent } from 'react'
import { Grid } from '@mui/material'
import NoteTitleInput from './NoteTitleInput'

interface RecordingFormProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RecordingForm = (props: RecordingFormProps) => {
  const { handleNoteTitleChange } = props

  return (
    <Grid container>
      <NoteTitleInput handleNoteTitleChange={handleNoteTitleChange} />
    </Grid>
  )
}

export default RecordingForm
