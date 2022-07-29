import { ComponentStory, ComponentMeta } from '@storybook/react'
import ChecklistForm from '.'
import { RecoilRoot } from 'recoil'

export default {
  title: 'Components/Forms/NoteFormContainer/Checklist/ChecklistForm',
  component: ChecklistForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ChecklistForm>

const Template: ComponentStory<typeof ChecklistForm> = (args) => (
  <ChecklistForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  handleNoteTitleChange: () => null,
}
Default.decorators = [
  (Story) => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  ),
]
