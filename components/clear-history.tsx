'use client'

import * as React from 'react' // Importing React library
import { useRouter } from 'next/navigation' // Importing useRouter hook from Next.js for navigation
import { toast } from 'react-hot-toast' // Importing toast function from react-hot-toast for displaying notifications

import { ServerActionResult } from '@/lib/types' // Importing ServerActionResult type from '@/lib/types'
import { Button } from '@/components/ui/button' // Importing Button component from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger // Importing various components related to AlertDialog from '@/components/ui/alert-dialog'
} from '@/components/ui/alert-dialog'
import { IconSpinner } from '@/components/ui/icons' // Importing IconSpinner component from '@/components/ui/icons'

// Defining the ClearHistoryProps interface for the ClearHistory component's props
interface ClearHistoryProps {
  isEnabled: boolean // A boolean indicating whether the 'Clear history' button is enabled or not
  clearChats: () => ServerActionResult<void> // A function to clear chats, returns a Promise that resolves to ServerActionResult<void>
}

// Defining the ClearHistory functional component
export function ClearHistory({
  isEnabled = false, // Setting the default value of isEnabled to false
  clearChats // Destructuring the clearChats prop
}: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false) // Setting up state for alert dialog visibility
  const [isPending, startTransition] = React.useTransition() // Setting up state for transition and pending status
  const router = useRouter() // Initializing useRouter hook

  // Returning the JSX for the ClearHistory component
  return (
    <AlertDialog open={open} onOpenChange={setOpen}> {/* Rendering AlertDialog component with open and onOpenChange props */}
      <AlertDialogTrigger asChild> {/* Rendering AlertDialogTrigger as a child component */}
        <Button variant="ghost" disabled={!isEnabled || isPending}> {/* Rendering Button component with ghost variant and disabled prop */}
          {isPending && <IconSpinner className="mr-2" />} {/* Conditionally rendering IconSpinner if isPending is true */}
          Clear history
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent> {/* Rendering AlertDialogContent component */}
        <AlertDialogHeader> {/* Rendering AlertDialogHeader component */}
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> {/* Rendering AlertDialogTitle component */}
          <AlertDialogDescription>
            This will permanently delete your chat history and remove your data
            from our servers.
          </AlertDialogDescription> {/* Rendering AlertDialogDescription component */}
        </AlertDialogHeader>
        <AlertDialogFooter> {/* Rendering AlertDialogFooter component */}
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel> {/* Rendering AlertDialogCancel component with disabled prop */}
          <AlertDialogAction
            disabled={isPending}
            onClick={event => {
              event.preventDefault()
              startTransition(() => {
                clearChats().then(result => {
                  if (result && 'error' in result) {
                    toast.error(result.error)
                    return
                  }

                  setOpen(false)
                  router.push('/')
                })
              })
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />} {/* Conditionally rendering IconSpinner if isPending is true */}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

