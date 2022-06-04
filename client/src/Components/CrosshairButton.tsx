import { IconButton, Box } from '@mui/material'
import { atomIsModalOpen } from '../atoms'
import { useSetRecoilState } from 'recoil'
import AddBoxIcon from '@mui/icons-material/AddBox'

const CrosshairButton = (): JSX.Element => {
  const setIsModalOpen = useSetRecoilState(atomIsModalOpen)
  const openModal = () => setIsModalOpen(true)

  return (
    <IconButton
      aria-label="new note"
      color="info"
      sx={{ position: 'relative' }}
      onClick={openModal}
    >
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: 'red',
          zIndex: -20,
          top: '28px',
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: 'blue',
          zIndex: -20,
          right: '28px',
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: 'green',
          zIndex: -20,
          bottom: '28px',
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: 'yellow',
          zIndex: -20,
          left: '28px',
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          height: '15px',
          width: '15px',
          backgroundColor: '#525355',
          zIndex: -25,
          left: '35px',
        }}
      ></Box>
      <AddBoxIcon sx={{ fontSize: '76px' }} />
    </IconButton>
  )
}

export default CrosshairButton
