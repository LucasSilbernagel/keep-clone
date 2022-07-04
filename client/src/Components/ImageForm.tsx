import { ChangeEvent } from 'react'
import { Grid } from '@mui/material'
import NoteTitleInput from './NoteTitleInput'
import { atomNewNote, atomNoteBeingEdited, atomEditingID } from '../atoms'
import { useRecoilValue } from 'recoil'

interface ImageFormProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ImageForm = (props: ImageFormProps) => {
  const { handleNoteTitleChange } = props

  /** The note that is being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** The new note */
  const newNote = useRecoilValue(atomNewNote)
  /** The ID of the note being edited */
  const editingID = useRecoilValue(atomEditingID)

  return (
    <Grid container>
      <NoteTitleInput handleNoteTitleChange={handleNoteTitleChange} />
      <Grid item>
        <img
          src={editingID ? noteBeingEdited.image : newNote.image}
          alt="my upload"
          style={{ width: '100%', display: 'block' }}
        />
      </Grid>
    </Grid>
  )
}

export default ImageForm
