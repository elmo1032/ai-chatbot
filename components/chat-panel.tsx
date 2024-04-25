// Import necessary modules and components from React, 'ai/react', and the local app and components directories.
import * as React from 'react'
import { type UseChatHelpers } from 'ai/react'

import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'

// Define the ChatPanelProps interface, which extends a subset of UseChatHelpers and includes the id and title properties.
export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  title?: string
}

// Define the ChatPanel functional component, which takes ChatPanelProps as its parameter.
export function ChatPanel({
  id,
  title,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  // Declare and initialize the shareDialogOpen state variable using the React.useState hook.
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  // Return the JSX representing the chat panel UI.
  return (
    <div
      // Apply fixed positioning, inset horizontal margins, bottom placement, and a background gradient to the container div.
      className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]"
    >
      {/* Render the ButtonScrollToBottom component. */}
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        {/* Render a flex container for the header buttons. */}
        <div className="flex items-center justify-center h-12">
          {/* Check if isLoading is true. If so, render a Stop generating button. Otherwise, render a Regenerate response and Share button if messages array has a length greater than or equal to 2. */}
          {isLoading ? (
            <Button
              // Set the button variant to outline, and attach an onClick event handler that calls the stop function.
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              {/* Render the IconStop component and the text "Stop generating". */}
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length >= 2 && (
              <div className="flex space-x-2">
                {/* Render the Regenerate response button. */}
                <Button variant="outline" onClick={() => reload()}>
                  {/* Render the IconRefresh component and the text "Regenerate response". */}
                  <IconRefresh className="mr-2" />
                  Regenerate response
                </Button>
                {/* Check if id and title are defined. If so, render the Share button and the ChatShareDialog component. */}
                {id && title ? (
                  <>
                    <Button
                      // Set the button variant to outline, and attach an onClick event handler that sets shareDialogOpen to true.
                      variant="outline"
                      onClick={() => setShareDialogOpen(true)}
                    >
                      {/* Render the IconShare component and the text "Share". */}
                      <IconShare className="mr-2" />
                      Share
                    </Button>
                    {/* Render the ChatShareDialog component, passing the necessary props. */}
                    <ChatShareDialog
                      open={shareDialogOpen}
                      onOpenChange={setShareDialogOpen}
                      onCopy={() => setShareDialogOpen(false)}
                      shareChat={shareChat}
                      chat={{
                        id,
                        title,
                        messages
                      }}
                    />
                  </>
                ) : null}
              </div>
            )
          )}
        </div>
        {/* Render the PromptForm and FooterText components. */}
        <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              // Call the append function with the necessary parameters when the form is submitted.
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
