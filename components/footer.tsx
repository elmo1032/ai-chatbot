import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

// Add type imports
import { LinkProps } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  const externalLinkProps: LinkProps = {
    className: 'underline underline-hover',
  }

  return (
    <p
      id="footer-text"
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      aria-label="Footer text"
      {...props}
    >
      Open source AI chatbot built with <ExternalLink {...externalLinkProps} href="https://nextjs.org" title="Next.js" target="_blank" rel="noopener noreferrer">Next.js</ExternalLink> and <ExternalLink {...externalLinkProps} href="https://vercel.com/storage/kv" title="Vercel KV" target="_blank" rel="noopener noreferrer">Vercel KV</ExternalLink>.
    </p>
  )
}

