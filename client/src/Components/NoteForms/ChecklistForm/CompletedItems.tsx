import {
  Grid,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { useRecoilValue } from 'recoil'
import { atomNoteList } from '../../../atoms'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface IComponentProps {
  handleListCheckboxChange: (index: number) => void
  handleDelete: (index: number) => void
}

const CompletedItems = (props: IComponentProps) => {
  const { handleListCheckboxChange, handleDelete } = props

  const noteList = useRecoilValue(atomNoteList)

  if (noteList.filter((item) => item.done).length > 0) {
    return (
      <>
        <Accordion defaultExpanded square sx={{ width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="completed-items"
            id="completed-items-header"
          >
            <Typography>Completed items</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ width: '100%' }} dense>
              {noteList
                .filter((item) => item.done)
                .map((item, index) => {
                  return (
                    <ListItem key={index}>
                      <Grid
                        item
                        container
                        alignContent="center"
                        justifyContent="center"
                        xs={1}
                      >
                        <Grid padding="checkbox" item>
                          <Checkbox
                            checked={item.done}
                            onClick={() => handleListCheckboxChange(index)}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography
                          sx={{
                            textDecoration: 'line-through',
                            width: '100%',
                            paddingLeft: '1em',
                            maxHeight: '50vh',
                            overflowY: 'auto',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'transparent',
                              },
                              '&:hover fieldset': {
                                borderColor: 'transparent',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                              },
                            },
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        {item.text.length > 0 && (
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(index)}
                              aria-label="delete"
                            >
                              <ClearIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Grid>
                    </ListItem>
                  )
                })}
            </List>
          </AccordionDetails>
        </Accordion>
      </>
    )
  } else return null
}

export default CompletedItems
