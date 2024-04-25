import * as React from 'react'
// Import Textarea component from 'react-textarea-autosize'
import Textarea from 'react-textarea-autosize'
// Import UseChatHelpers from 'ai/react'
import { UseChatHelpers } from 'ai/react'
// Import useEnterSubmit hook from '@/lib/hooks/use-enter-submit'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
// Import cn function from '@/lib/utils'
import { cn } from '@/lib/utils'
// Import Button, buttonVariants, Tooltip, TooltipContent, TooltipTrigger, IconArrowElbow, and IconPlus components from '@/components/ui'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
// Import useRouter hook from 'next/navigation'
import { useRouter } from 'next/navigation'

// Define PromptProps interface that extends Pick<UseChatHelpers, 'input' | 'setInput'>
export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  // Define onSubmit callback function that takes a value of type string
  onSubmit: (value: string) => void
  // Define isLoading boolean property
  isLoading: boolean
}

// Define PromptForm component that takes PromptProps as a prop
export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  // Destructure formRef and onKeyDown functions from useEnterSubmit hook
  const { formRef, onKeyDown } = useEnterSubmit()
  // Create a ref for Textarea component
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  // Initialize useRouter hook
  const router = useRouter()

  // Run the effect when the component is mounted
  React.useEffect(() => {
    // If inputRef is not null, focus on the Textarea component
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Return a form component that takes onSubmit function as an event handler
  return (
    <form
      onSubmit={async e => {
        // Prevent the default form submission behavior
        e.preventDefault()
        // If input is empty, return and do nothing
        if (!input?.trim()) {
          return
        }
        // Set input to an empty string
        setInput('')
        // Call onSubmit function with input as an argument
        await onSubmit(input)
      }}
      // Set formRef as a ref for the form component
      ref={formRef}
    >
      {/* Render a div component that contains a Textarea component and two button components */}
      <div className="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border sm:px-12">
        {/* Render a Tooltip component that contains a button component */}
        <Tooltip>
          <TooltipTrigger asChild>
            {/* Render a button component that navigates to the home page and refreshes the current page */}
            <button
              onClick={e => {
                e.preventDefault()
                router.refresh()
                router.push('/')
              }}
              // Set buttonVariants props to 'sm' and 'outline'
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'absolute left-0 top-4 size-8 rounded-full bg-background p-0 sm:left-4'
              )}
            >
              {/* Render an IconPlus component */}
              <IconPlus />
              {/* Set a screen reader only text for the button component */}
              <span className="sr-only">New Chat</span>
            </button>
          </TooltipTrigger>
          {/* Render a TooltipContent component that contains the text 'New Chat' */}
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        {/* Render a Textarea component */}
        <Textarea
          ref={inputRef}
          // Set tabIndex to 0
          tabIndex={0}
          // Set onKeyDown function as an event handler
          onKeyDown={onKeyDown}
          // Set rows to 1
          rows={1}
          // Set value to input
          value={input}
          // Set onChange function as an event handler
          onChange={e => setInput(e.target.value)}
          // Set placeholder to 'Send a message.'
          placeholder="Send a message."
          // Set spellCheck to false
          spellCheck={false}
          // Set className to a string that contains several classes
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        {/* Render a div component that contains a Tooltip component that contains a button component */}
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              {/* Render a button component that calls onSubmit function when clicked */}
              <Button
                type="submit"
                // Set size to 'icon'
                size="icon"
                // Set disabled prop to isLoading or input is empty
                disabled={isLoading || input === ''}
              >
                {/* Render an IconArrowElbow component */}
                <IconArrowElbow />
                {/* Set a screen reader only text for the button component */}
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            {/* Render a TooltipContent component that contains the text 'Send message' */}
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}

