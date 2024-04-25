// Import necessary modules and functions from React and custom libraries
import * as React from 'react'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'

// Define the SidebarProps interface which extends React.ComponentProps<'div'>
// and picks certain properties from the Sidebar component
export interface SidebarProps
  extends React.ComponentProps<'div'>,
    Pick<Sidebar, 'sideBarState' | 'sideBarTransition'> {
  sideBarOpen?: boolean
  sideBarLoading?: boolean
}

// Define the Sidebar functional component
export function Sidebar({
  // Destructure the className, sideBarState, sideBarTransition, children,
  // sideBarOpen, and sideBarLoading props
  className,
  sideBarState,
  sideBarTransition,
  children,
  sideBarOpen = useSidebar((state) => state.isSidebarOpen), // Set the default value for sideBarOpen using the useSidebar hook
  sideBarLoading = useSidebar((state) => state.isLoading), // Set the default value for sideBarLoading using the useSidebar hook
}: SidebarProps) {
  // Return a div element with various classes and props
  return (
    <div
      // Set the data-state attribute based on the sideBarState or the combination
      // of sideBarOpen and sideBarLoading
      data-state={sideBarState || (sideBarOpen && !sideBarLoading ? 'open' : 'closed')}
      // Apply the className, cn-generated class, and sideBarTransition-generated class
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

