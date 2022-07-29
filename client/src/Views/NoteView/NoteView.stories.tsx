import { ComponentStory, ComponentMeta } from '@storybook/react'
import NoteView from '.'
import { RecoilRoot } from 'recoil'
import { atomViewportWidth, atomIsLoading } from '../../atoms'

localStorage.setItem(
  'userProfile',
  JSON.stringify({
    imageUrl: 'test',
    name: 'Test User',
    email: 'test@email.com',
    googleId: '123',
  })
)

export default {
  title: 'Views/NoteView',
  component: NoteView,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteView>

const Template: ComponentStory<typeof NoteView> = (args) => (
  <NoteView {...args} />
)

export const Desktop = Template.bind({})
Desktop.args = {
  setAuthenticated: () => null,
  deleteNote: () => null,
}
Desktop.decorators = [
  (Story) => (
    <RecoilRoot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initializeState={(snap: any): any => {
        snap.set(atomViewportWidth, 1400)
        snap.set(atomIsLoading, false)
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
        snap.set(atomViewportWidth, 400)
        snap.set(atomIsLoading, false)
      }}
    >
      <Story />
    </RecoilRoot>
  ),
]
