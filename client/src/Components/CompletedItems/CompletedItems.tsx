import ClearIcon from '@mui/icons-material/Clear'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import { styled } from '@mui/material/styles'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { atomNoteList } from '../../atoms'

/** Accordino component that contains completed checklist items */
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    defaultExpanded
    {...props}
  />
))(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}))

/** The accordion header */
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<KeyboardArrowRightIcon />} {...props} />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(3),
  },
}))

/** The contents of the accordion, under the header */
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
}))

interface CompletedItemsProps {
  handleListCheckboxChange: (id: string) => void
  handleDeleteChecklistItem: (id: string) => void
}

const CompletedItems: React.FC<CompletedItemsProps> = (
  props: CompletedItemsProps
) => {
  const { handleListCheckboxChange, handleDeleteChecklistItem } = props

  /** Array of checklist items for a note */
  const noteList = useRecoilValue(atomNoteList)

  if (noteList.filter((item) => item.done).length > 0) {
    return (
      <>
        <Accordion
          defaultExpanded
          square
          sx={{ width: '100%', backgroundColor: 'inherit' }}
        >
          <AccordionSummary
            aria-controls="completed-items"
            id="completed-items-header"
          >
            {noteList.filter((item) => item.done).length > 1 ? (
              <Typography>
                {noteList.filter((item) => item.done).length} Completed items
              </Typography>
            ) : (
              <Typography>1 Completed item</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ width: '100%' }} dense>
              {noteList
                .filter((item) => item.done)
                .map((item) => {
                  return (
                    <ListItem key={item.id}>
                      <Grid
                        item
                        container
                        alignContent="center"
                        justifyContent="center"
                        xs={1}
                      >
                        <Grid item>
                          <Checkbox
                            checked={item.done}
                            onClick={() => handleListCheckboxChange(item.id)}
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
                              onClick={() => handleDeleteChecklistItem(item.id)}
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
