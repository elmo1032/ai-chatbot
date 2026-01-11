'use client'

import * as React from 'react'

// Interface defining the props for the useCopyToClipboard hook
export interface UseCopyToClipboardProps {
  timeout?: number // Optional timeout value in milliseconds
}

// The useCopyToClipboard hook with its implementation
export function useCopyToClipboard({
  timeout = 2000
}: UseCopyToClipboardProps) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false)

  const copyToClipboard = (value: string) => {
    if (typeof window === 'undefined' || !navigator.clipboard?.writeText) {
      return
    }

    if (!value) {
      return
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    })
  }

  return { isCopied, copyToClipboard }
}
