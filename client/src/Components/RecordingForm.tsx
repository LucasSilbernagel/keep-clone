import { ChangeEvent, useEffect } from 'react'
import { Grid, Typography, IconButton, Tooltip } from '@mui/material'
import NoteTitleInput from './NoteTitleInput'
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import StopIcon from '@mui/icons-material/Stop'
import PauseIcon from '@mui/icons-material/Pause'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { keyframes } from '@mui/system'
import { atomNewNote, atomNoteBeingEdited, atomEditingID } from '../atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'

interface RecordingFormProps {
  handleNoteTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RecordingForm = (props: RecordingFormProps) => {
  const { handleNoteTitleChange } = props

  const {
    audioResult,
    timer,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
  } = useAudioRecorder()

  /** State setter to update the new note */
  const setNewNote = useSetRecoilState(atomNewNote)
  /** The note that is being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** The ID of the note being edited */
  const editingID = useRecoilValue(atomEditingID)

  /** Save the audio recording */
  useEffect(() => {
    if (audioResult) {
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.recording = audioResult
        editedNote.userGoogleId = JSON.parse(
          window.localStorage.userProfile
        ).googleId
        return editedNote
      })
    }
  }, [audioResult, setNewNote])

  /** Function to get stopwatch format (00:00:00) from an ISO string */
  const getStopwatch = (str: string) => {
    return [str.slice(0, 11), str.slice(11)][1].split('.')[0]
  }

  /** Blinking animation for the stopwatch when recording is paused */
  const blink = keyframes`
  0%,100% { opacity: 0 }
  50% { opacity: 1 }
  `

  if (editingID) {
    return (
      <Grid container>
        <NoteTitleInput handleNoteTitleChange={handleNoteTitleChange} />
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <audio controls src={noteBeingEdited.recording} />
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
                animation:
                  status === 'paused' ? `${blink} 1.5s linear infinite` : '',
              }}
            >
              {getStopwatch(new Date(timer * 1000).toISOString())}
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-evenly">
            <Tooltip title="Stop">
              <IconButton onClick={stopRecording} aria-label="stop recording">
                <StopIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Record">
              <IconButton
                onClick={startRecording}
                aria-label="start recording"
                color={status && status === 'recording' ? 'success' : 'default'}
              >
                <KeyboardVoiceIcon sx={{ fontSize: '3rem' }} />
              </IconButton>
            </Tooltip>
            {status !== 'paused' ? (
              <Tooltip title="Pause">
                <IconButton
                  onClick={pauseRecording}
                  aria-label="pause recording"
                >
                  <PauseIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Resume">
                <IconButton
                  onClick={resumeRecording}
                  aria-label="resume recording"
                >
                  <ArrowRightIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Grid>
    )
}

export default RecordingForm
