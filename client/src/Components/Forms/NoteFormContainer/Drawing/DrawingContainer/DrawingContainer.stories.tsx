import { ComponentStory, ComponentMeta } from '@storybook/react'
import DrawingContainer from '.'
import { mockNotes } from '../../../../../DataHelpers'
import { RecoilRoot } from 'recoil'
import {
  atomNoteType,
  atomIsDrawingActive,
  atomViewportWidth,
  atomViewportHeight,
  atomEditingID,
  atomNoteBeingEdited,
} from '../../../../../atoms'

export default {
  title: 'Components/Forms/NoteFormContainer/Drawing/DrawingContainer',
  component: DrawingContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DrawingContainer>

const Template: ComponentStory<typeof DrawingContainer> = (args) => (
  <DrawingContainer {...args} />
)

export const Desktop = Template.bind({})
Desktop.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomNoteType, 'drawing')
        snap.set(atomIsDrawingActive, true)
        snap.set(atomViewportHeight, 1400)
        snap.set(atomViewportWidth, 1400)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const Mobile = Template.bind({})
Mobile.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomNoteType, 'drawing')
        snap.set(atomIsDrawingActive, true)
        snap.set(atomViewportHeight, 400)
        snap.set(atomViewportWidth, 400)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]

export const ExistingDrawing = Template.bind({})
ExistingDrawing.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomNoteType, 'drawing')
        snap.set(atomIsDrawingActive, true)
        snap.set(atomViewportHeight, 400)
        snap.set(atomViewportWidth, 600)
        snap.set(atomEditingID, mockNotes[2]._id)
        snap.set(atomNoteBeingEdited, mockNotes[2])
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
