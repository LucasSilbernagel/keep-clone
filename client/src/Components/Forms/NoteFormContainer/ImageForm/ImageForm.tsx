import { Grid } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { useRecoilValue } from 'recoil'

import {
  atomEditingID,
  atomNewNote,
  atomNoteBeingEdited,
} from '../../../../atoms'
import NoteTitleInput from '../../NoteTitleInput'

interface ImageFormProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ImageForm: React.FC<ImageFormProps> = (props: ImageFormProps) => {
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
