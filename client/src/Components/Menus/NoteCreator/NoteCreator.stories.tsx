import { ComponentStory, ComponentMeta } from '@storybook/react'
import NoteCreator from '.'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth } from '../../../atoms'

export default {
  title: 'Components/Menus/NoteCreator',
  component: NoteCreator,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteCreator>

const Template: ComponentStory<typeof NoteCreator> = (args) => (
  <NoteCreator {...args} />
)

export const Desktop = Template.bind({})
Desktop.args = {
  creatingNote: false,
  setCreatingNote: () => null,
  finishCreatingNote: () => null,
}
Desktop.decorators = [
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

export const Mobile = Template.bind({})
Mobile.args = {
  ...Desktop.args,
}
Mobile.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomViewportWidth, 440)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
