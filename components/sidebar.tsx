'use client'

import * as React from 'react'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { SidebarState } from '@/types'

export interface SidebarProps
  extends React.ComponentProps<'div'>,
    Pick<Sidebar, 'sideBarState' | 'sideBarTransition'> {
  sideBarOpen?: boolean
  sideBarLoading?: boolean
}

export function Sidebar({
  className,
  sideBarState,
  sideBarTransition,
  sideBarOpen = useSidebar((state) => state.isSidebarOpen),
  sideBarLoading = useSidebar((state) => state.isLoading),
  children,
}: SidebarProps) {
  return (
    <div
      data-state={sideBarState || (sideBarOpen && !sideBarLoading ? 'open' : 'closed')}
      className={cn(
        className,
        'h-full flex-col transition-transform duration-300',
        sideBarTransition || 'ease-in-out'
      )}
    >
      {children}
    </div>
  )
}
