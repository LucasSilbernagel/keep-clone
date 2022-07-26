import { ComponentStory, ComponentMeta } from '@storybook/react'
import MoreColors from '.'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../../../atoms'

export default {
  title: 'Components/Forms/NoteFormContainer/Drawing/MoreColors',
  component: MoreColors,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MoreColors>

const Template: ComponentStory<typeof MoreColors> = (args) => (
  <MoreColors {...args} />
)

export const Default = Template.bind({})
Default.args = {
  selectedColor: { label: 'Black', color: '#000000' },
  showingMoreColors: true,
  updateColor: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomViewportWidth, 1440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
