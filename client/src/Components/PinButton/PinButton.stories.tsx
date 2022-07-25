import { ComponentStory, ComponentMeta } from '@storybook/react'
import PinButton from '.'
import { RecoilRoot } from 'recoil'
import { atomNoteBeingEdited } from '../../atoms'
import { mockNotes } from '../../DataHelpers'

export default {
  title: 'Components/PinButton',
  component: PinButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PinButton>

const Template: ComponentStory<typeof PinButton> = (args) => (
  <PinButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  rightAlignment: 0,
  topAlignment: 0,
  isAlreadySaved: false,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomNoteBeingEdited, mockNotes[0])
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
