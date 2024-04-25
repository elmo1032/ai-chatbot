'use client'

import { useRouter } from 'next/navigation' // Importing useRouter hook from Next.js navigation package
import * as React from 'react' // Importing React library
import { toast } from 'react-hot-toast' // Importing toast function from react-hot-toast package

// Importing custom components and types
import { ServerActionResult, type Chat } from '@/lib/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { IconShare, IconSpinner, IconTrash } from '@/components/ui/icons'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

// Defining SidebarActionsProps interface for SidebarActions component props
interface SidebarActionsProps {
  chat: Chat
  removeChat: (args: { id: string; path: string }) => Promise<ServerActionResult<void>>
  shareChat: (id: string) => Promise<ServerActionResult<Chat>>
}

// SidebarActions component
export function SidebarActions({
  chat, // Chat object to be used in the component
  removeChat, // removeChat function to delete a chat
  shareChat // shareChat function to share a chat
}: SidebarActionsProps) {
  const router = useRouter() // Initializing useRouter hook
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false) // State for delete dialog visibility
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false) // State for share dialog visibility
  const [isRemovePending, startRemoveTransition] = React.useTransition() // State and function for remove transition
  const [removeError, setRemoveError] = React.useState<string | null>(null) // State for remove error message
  const [shareError, setShareError] = React.useState<string | null>(null) // State for share error message

  // Function for handling chat sharing
  const handleShareChat = async (id: string) => {
    setShareError(null) // Resetting share error message
    try {
      const result = await shareChat(id) // Calling shareChat function
      if (result && 'error' in result) { // Checking for error in the result
        setShareError(result.error) // Setting share error message
        return
      }
      toast.success('Chat shared') // Showing success toast message
      setShareDialogOpen(false) // Hiding share dialog
    } catch (error) {
      setShareError('An error occurred while sharing the chat') // Setting share error message
    }
  }

  // Function for handling chat removal
  const handleRemoveChat = async (event: React.FormEvent<HTMLFormElement>, id: string, path: string) => {
    event.preventDefault() // Preventing default form submission behavior
    setRemoveError(null) // Resetting remove error message
    startRemoveTransition(async () => { // Starting remove transition
      setDeleteDialogOpen(false) // Hiding delete dialog
      try {
        const result = await removeChat({ id, path }) // Calling removeChat function
        if (result && 'error' in result) { // Checking for error in the result
          setRemoveError(result.error) // Setting remove error message
          return
        }
        toast.success('Chat deleted') // Showing success toast message
        router.refresh() // Refreshing the page
        router.push('/') // Navigating to home page
      } catch (error) {
        setRemoveError('An error occurred while deleting the chat') // Setting remove error message
      }
    })
  }

  // JSX for SidebarActions component
  return (
    <>
      <div className="space-x-1">
        {/* Tooltip for Share button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="size-6 p-0 hover:bg-background"
              onClick={() => setShareDialogOpen(true)}
            >
              <IconShare />
              <span className="sr-only">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share chat</TooltipContent>
        </Tooltip>
        {/* Tooltip for Delete button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="size-6 p-0 hover:bg-background"
              disabled={isRemovePending}
              onClick={() => setDeleteDialogOpen(true)}
            >
              <IconTrash />
              <span className="sr-only">Delete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete chat</TooltipContent>
        </Tooltip>
      </div>
      {/* ChatShareDialog component for sharing a chat */}
      <ChatShareDialog
        chat={chat} // Chat object
        shareChat={handleShareChat} // Function for handling chat sharing
        open={shareDialogOpen} // State for dialog visibility
        onOpenChange={setShareDialogOpen} // Function for handling dialog open state change
        onCopy={() => setShareDialogOpen(false)} // Function for handling copy action
      />
      {/* AlertDialog component for deleting a chat */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your chat message and remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemovePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isRemovePending}
              onClick={(event) => handleRemoveChat(event, chat.id, chat.path)}
            >
              {isRemovePending && <IconSpinner className="mr-2 animate-spin" />} {/* Spinner for remove transition */}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Error toast message for remove error */}
      {removeError && toast.error(removeError)}
      {/* Error toast message for share error */}
      {shareError && toast.error(shareError)}
    </>
  )
}

