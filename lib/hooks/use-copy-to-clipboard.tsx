'use client'

import * as React from 'react'

// Interface defining the props for the useCopyToClipboard hook
export interface UseCopyToClipboardProps {
  timeout?: number // Optional timeout value in milliseconds
}

// The useCopyToClipboard hook with its implementation
export function useCopyToClipboard({
  timeout = 200
