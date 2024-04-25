'use client'

import React, { forwardRef, PropsWith, ReactNode, useMemo } from 'react'
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

type ProvidersProps = PropsWith<ThemeProviderProps, { children: ReactNode }>

const Providers = forwardRef<HTMLDivElement, ProvidersProps>(({ children, ...props }, ref) => {
  const sidebarProvider = useMemo(() => <SidebarProvider key="sidebar" />, [children])
  const tooltipProvider = useMemo(() => <TooltipProvider key="tooltip" />, [children])

  return (
    <NextThemesProvider {...props} ref={ref}>
      {sidebarProvider}
      {tooltipProvider}
      {children}
    </NextThemesProvider>
  )
})

Providers.displayName = 'Providers'

export default Providers

