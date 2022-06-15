import { Typography, Divider } from '@mui/material'
import { IExistingNote } from '../types'

const CompletedListSummary = (props: { note: IExistingNote }) => {
  const { note } = props
  return (
    <>
      <Divider />
      <Typography sx={{ marginLeft: '1em', marginTop: '1em' }}>
        {note.list.filter((item) => item.done && item.text.length > 0).length >
        1
          ? `+ ${
              note.list.filter((item) => item.done && item.text.length > 0)
                .length
            } Completed items`
          : `+ 1 Completed item`}
      </Typography>
    </>
  )
}

export default CompletedListSummary
