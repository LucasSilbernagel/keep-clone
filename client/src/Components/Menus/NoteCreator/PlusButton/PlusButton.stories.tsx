import { ComponentStory, ComponentMeta } from '@storybook/react'
import PlusButton from '.'
import { RecoilRoot } from 'recoil'
import { atomIsDarkTheme } from '../../../../atoms'

export default {
  title: 'Components/Menus/NoteCreator/PlusButton',
  component: PlusButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PlusButton>

const Template: ComponentStory<typeof PlusButton> = () => <PlusButton />

export const Default = Template.bind({})
Default.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomIsDarkTheme, false)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
