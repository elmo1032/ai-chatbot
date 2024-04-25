import { UseChatHelpers } from 'ai/react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

type ExampleMessage = {
  heading: string
  message: string
}

const exampleMessages: ExampleMessage[] = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n'
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div
        className="rounded-lg border bg-background p-8"
        role="region"
        aria-labelledby="chatbot-welcome-title"
      >
        <h1 id="chatbot-welcome-title" className="mb-2 text-lg font-semibold">
          Welcome to Next.js AI Chatbot!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an open source AI chatbot app template built with{' '}
          <ExternalLink
            href="https://nextjs.org"
            title="Next.js homepage"
            className="text-base underline"
          >
            Next.js
          </ExternalLink>
          {' '}
          and{' '}
          <ExternalLink
            href="https://vercel.com/storage/kv"
            title="Vercel KV documentation"
            className="text-base underline"
          >
            Vercel KV
          </ExternalLink>
          .
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:

