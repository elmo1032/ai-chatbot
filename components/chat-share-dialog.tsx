'use client' // This indicates that this component is a client-side component in Next.js

import * as React from 'react' // Importing React and required libraries
import { Toast } from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'

// Interface for ChatShareDialogProps
interface ChatShareDialogProps {
  chat: Pick<Chat, 'id' | 'title' | 'messages' | 'sharePath'> // The chat object with specific properties
  shareChat: (id: string) => Promise<Chat | ServerActionError> // Function to share the chat
  onCopy: () => void // Callback function when the link is copied
}

// Interface for Chat
interface Chat extends Pick<Chat, 'id' | 'title' | 'messages' | 'sharePath'> {}

// Interface for ServerActionError
interface ServerActionError {
  error: string
}

// ChatShareDialog component
export function ChatShareDialog({ chat, shareChat, onCopy }: ChatShareDialogProps) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 }) // Using the useCopyToClipboard hook
  const [isSharePending, startShareTransition] = React.useTransition() // Using the useTransition hook for smooth sharing

  // Function to copy the share link
  const copyShareLink = React.useCallback(
    async (chat: Chat) => {
      if (!chat.sharePath) {
        return toast.error('Could not copy share link to clipboard') // Error toast if no sharePath exists
      }

      const url = new URL(window.location.href) // Creating a new URL object
      url.pathname = chat.sharePath // Setting the pathname to the sharePath

      try {
        await copyToClipboard(url.toString()) // Copying the URL to clipboard
        onCopy() // Calling the onCopy callback
        toast.success('Share link copied to clipboard', { // Success toast
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '14px'
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black'
          }
        })
      } catch (error) {
        toast.error('Could not copy share link to clipboard') // Error toast if copying to clipboard fails
      }
    },
    [copyToClipboard, onCopy]
  )

  return (
    <Dialog> {/* Rendering the Dialog component */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link to chat</DialogTitle> {/* Dialog title */}
          <DialogDescription>
            Anyone with the URL will be able to view the shared chat. {/* Dialog description */}
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-1 text-sm border rounded-md">
          <div className="font-medium">{chat.title}</div> {/* Rendering the chat title */}
          <div className="text-muted-foreground">
            {chat.messages.length} messages {/* Rendering the number of messages */}
          </div>
        </div>
        <DialogFooter className="items-center"> {/* Dialog footer */}
          <Button
            disabled={!chat.sharePath || isSharePending}
            onClick={() => {
              startShareTransition(async () => {
                const result = await shareChat(chat.id) // Calling the shareChat function

                if ('error' in result) {
                  toast.error(result.error) // Error toast if there's an error in the result
                  return
                }

                if (result) {
                  copyShareLink(result) // Calling the copyShareLink function if the result is valid
                }
              })
            }}
          >
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" /> {/* Spinner while sharing */}
                Copying...
              </>
            ) : (
              <>Copy link</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

