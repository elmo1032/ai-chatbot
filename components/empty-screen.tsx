// Importing necessary dependencies and components
import { UseChatHelpers } from 'ai/react' // Importing UseChatHelpers from 'ai/react' to use chatbot functionalities
import React from 'react' // Importing React for building user interfaces
import { Button } from '@/components/ui/button' // Importing Button component from the project's UI button library
import { ExternalLink } from '@/components/external-link' // Importing ExternalLink component from the project's external link library
import { IconArrowRight } from '@/components/ui/icons' // Importing IconArrowRight component from the project's UI icons library

// Defining the ExampleMessage type, which contains a heading and a message
type ExampleMessage = {
  heading: string // The heading of the example message
  message: string // The message content of the example message
}

// Creating an array of example messages
const exampleMessages: ExampleMessage[] = [
  {
    heading: 'Explain technical concepts', // Heading for the first example message
    message: `What is a "serverless function"?` // Message content for the first example message
  },
  {
    heading: 'Summarize an article', // Heading for the second example message
    message: 'Summarize the following article for a 2nd grader: \n' // Message content for the second example message
  },
  {
    heading: 'Draft an email', // Heading for the third example message
    message: `Draft an email to my boss about the following: \n` // Message content for the third example message
  }
]

// EmptyScreen component definition
export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  // Rendering the component
  return (
    <div className="mx-auto max-w-2xl px-4"> {/* Container for the content */}
      <div
        className="rounded-lg border bg-background p-8" // Styling for the main content box
        role="region" // ARIA role for the main content box
        aria-labelledby="chatbot-welcome-title" // ARIA label for the main content box
      >
        <h1 id="chatbot-welcome-title" className="mb-2 text-lg font-semibold">
          Welcome to Next.js AI Chatbot!
        </h1> {/* Title for the chatbot welcome section */}
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an open source AI chatbot app template built with{' '}
          <ExternalLink
            href="https://nextjs.org" // Link to Next.js homepage
            title="Next.js homepage" // Tooltip text for the link
            className="text-base underline" // Styling for the link
          >
            Next.js
          </ExternalLink>
          {' '}
          and{' '}
          <ExternalLink
            href="https://vercel.com/storage/kv" // Link to Vercel KV documentation
            title="Vercel KV documentation" // Tooltip text for the link
            className="text-base underline" // Styling for the link
          >
            Vercel KV
          </ExternalLink>
          .
        </p> {/* Description of the chatbot app template */}
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:

          {exampleMessages.map((message, index) => ( // Mapping through the exampleMessages array
            <div key={index}>
              <h2 className="mb-1 text-lg font-semibold">{message.heading}</h2> {/* Displaying the example message heading */}
              <p className="mb-2 leading-normal text-muted-foreground">{message.message}</p> {/* Displaying the example message content */}
            </div>
          ))}

        </p> {/* Displaying the examples */}
      </div>
    </div>
  )
}
