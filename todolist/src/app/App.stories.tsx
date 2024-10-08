import type { Meta, StoryObj } from "@storybook/react"
import App from "./App"
import { BrowserRouter, ReduxStoreProviderDecorator } from "../stories/decorators/ReduxStoreProviderDecorator"

const meta: Meta<typeof App> = {
  title: "Todolist/App",
  component: App,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator, BrowserRouter],
}

export default meta
type Story = StoryObj<typeof App>

export const AppStory: Story = {
  args: {
    demo: true,
  },
}
