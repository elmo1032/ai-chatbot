'use client'

import React, { forwardRef } from 'react'
import { SeparatorProps, SeparatorStyleKey } from '@radix-ui/react-separator'
import { cn } from '@/lib/utils'

const Separator = forwardRef<
  SeparatorProps['element'],
  SeparatorProps
>(({ className = '', orientation = 'horizontal', decorative = true, ...props }, ref) => {
  const orientationClasses: Record<SeparatorStyleKey, string> = {
    horizontal: 'h-[1px] w-full',
    vertical: 'h-full w-[1px]',
  }

  const isOrientationValid = ['horizontal', 'vertical'].includes(orientation)
  const isDecorativeValid = typeof decorative === 'boolean'

  if (!isOrientationValid) {
    console.error('Invalid orientation prop. Must be "horizontal" or "vertical"')
  }

  if (!isDecorativeValid) {
    console.error('Invalid decorative prop. Must be a boolean')
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientationClasses[orientation],
        className
      )}
      {...props}
    />
  )
})

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
