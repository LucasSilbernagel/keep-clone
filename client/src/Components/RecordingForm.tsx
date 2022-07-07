import { ChangeEvent, useEffect, useState } from 'react'
import { Grid, Typography, IconButton, Tooltip } from '@mui/material'
import NoteTitleInput from './NoteTitleInput'
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import StopIcon from '@mui/icons-material/Stop'
import { atomNewNote, atomNoteBeingEdited, atomEditingID } from '../atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'

interface RecordingFormProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RecordingForm = (props: RecordingFormProps) => {
  const { handleNoteTitleChange } = props

  /** Methods from the audio recorder library */
  const { audioResult, timer, startRecording, stopRecording, status } =
    useAudioRecorder()

  /** State setter to update the new note */
  const setNewNote = useSetRecoilState(atomNewNote)
  /** The note that is being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** The ID of the note being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** The recording duration, saved */
  const [savedTimer, setSavedTimer] = useState<string>('00:00:00')

  /** Save the audio recording */
  useEffect(() => {
    if (audioResult) {
      fetch(audioResult)
        .then((res) => res.blob())
        .then((blob) => blobToBase64(blob))
        .then((base64) =>
          setNewNote((prevNote) => {
            const editedNote = { ...prevNote }
            if (typeof base64 === 'string') {
              editedNote.recording = base64
              editedNote.recordingDuration = savedTimer
            }
            editedNote.userGoogleId = JSON.parse(
              window.localStorage.userProfile
            ).googleId
            editedNote.lastEdited = Date.now()
            return editedNote
          })
        )
    }
  }, [audioResult, setNewNote, savedTimer])

  /** Function to convert a Blob to base64 format */
  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  }

  /** Function to get stopwatch format (00:00:00) from an ISO string */
  const getStopwatch = (str: string) => {
    return [str.slice(0, 11), str.slice(11)][1].split('.')[0]
  }

  /** Function to stop recording and save the recording duration timestamp */
  const handleStopRecording = () => {
    setSavedTimer(getStopwatch(new Date(timer * 1000).toISOString()))
    stopRecording()
  }

  if (editingID) {
    return (
      <Grid container>
        <NoteTitleInput handleNoteTitleChange={handleNoteTitleChange} />
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <audio controls src={noteBeingEdited.recording} />
          </Grid>
          <Grid item>
            <Typography
              sx={{
                fontSize: '2rem',
              }}
            >
              {noteBeingEdited.recordingDuration}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  } else
    return (
      <Grid container>
        <NoteTitleInput handleNoteTitleChange={handleNoteTitleChange} />
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <audio controls src={audioResult} />
          </Grid>
          <Grid item>
            <Typography
              sx={{
                fontSize: '2rem',
              }}
            >
              {status === 'recording' || status === 'paused'
                ? getStopwatch(new Date(timer * 1000).toISOString())
                : savedTimer}
            </Typography>
          </Grid>
          <Grid item>
            {status !== 'recording' ? (
              <Tooltip title="Record">
                <IconButton
                  onClick={startRecording}
                  aria-label="record"
                  color="success"
                >
                  <KeyboardVoiceIcon sx={{ fontSize: '3rem' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Stop">
                <IconButton
                  onClick={handleStopRecording}
                  aria-label="stop recording"
                  color="error"
                >
                  <StopIcon sx={{ fontSize: '3rem' }} />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Grid>
    )
}

export default RecordingForm
