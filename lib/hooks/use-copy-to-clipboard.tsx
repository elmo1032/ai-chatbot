'use client'

import * as React from 'react'

export interface UseCopyToClipboardProps {
  timeout?: number
}

export function useCopyToClipboard({
  timeout = 2000
}: UseCopyToClipboardProps) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false)

  const copyToClipboard = React.useCallback(
    (value: string): void => {
      if (typeof window === 'undefined' || !navigator.clipboard) {
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
    },
    [timeout]
  )

  return { isCopied, copyToClipboard }
}
