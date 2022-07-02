import { ChangeEvent } from 'react'
import { Grid, Typography, IconButton, Tooltip } from '@mui/material'
import NoteTitleInput from './NoteTitleInput'
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import StopIcon from '@mui/icons-material/Stop'
import PauseIcon from '@mui/icons-material/Pause'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { keyframes } from '@mui/system'

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

  /** Function to get stopwatch format (00:00:00) from an ISO string */
  const getStopwatch = (str: string) => {
    return [str.slice(0, 11), str.slice(11)][1].split('.')[0]
  }

  /** Blinking animation for the stopwatch when recording is paused */
  const blink = keyframes`
  0%,100% { opacity: 0 }
  50% { opacity: 1 }
  `

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
            <IconButton onClick={startRecording} aria-label="start recording">
              <KeyboardVoiceIcon sx={{ fontSize: '3rem' }} />
            </IconButton>
          </Tooltip>
          {status !== 'paused' ? (
            <Tooltip title="Pause">
              <IconButton onClick={pauseRecording} aria-label="pause recording">
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
