'use client'

// Import necessary modules and components
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { buttonVariants } from '@/components/ui/button'
import { IconMessage, IconUsers } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { type Chat } from '@/lib/types'
import { cn } from '@/lib/utils'

// Define the SidebarItemProps interface for the SidebarItem component's props
interface SidebarItemProps {
  index: number // Index of the chat in the list
  chat: Chat // The chat object to display
  children: React.ReactNode // Additional content to be displayed if the chat is active
}

// Implement the SidebarItem component
export function SidebarItem({ index, chat, children }: SidebarItemProps) {
  // Get the current pathname using the usePathname hook
  const pathname = usePathname()

  // Check if the current chat is active based on the pathname
  const isActive = pathname === chat.path

  // Set up the local storage hook to store the new chat ID
  const [newChatId, setNewChatId] = useLocalStorage('newChatId', null)

  // Determine if the animation should be triggered based on the index, isActive, and newChatId
  const shouldAnimate = index === 0 && isActive && newChatId

  // Return the JSX for the SidebarItem
  if (!chat?.id) return null // Return null if the chat object is missing an id

  // Extract the chat title from the chat object
  const chatTitle = typeof chat.title === 'string' ? chat.title : ''

  // Render the SidebarItem
  return (
    <div className="relative h-8">
      {/* Conditionally render the animation div */}
      {shouldAnimate && (
        <motion.div
          // Set up the animation variants
          variants={{
            initial: {
              height: 0,
              opacity: 0
            },
            animate: {
              height: 'auto',
              opacity: 1
            }
          }}
          // Set up the animation states
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.25,
            ease: 'easeIn'
          }}
        >
          {/* Render the tooltip for shared chats */}
          {chat.sharePath ? (
            <Tooltip delayDuration={1000}>
              <TooltipTrigger
                tabIndex={-1}
                className="focus:bg-muted focus:ring-1 focus:ring-ring"
              >
                <IconUsers className="mr-2" />
              </TooltipTrigger>
              <TooltipContent>This is a shared chat.</TooltipContent>
            </Tooltip>
          ) : (
            <IconMessage className="mr-2" />
          )}
        </motion.div>
      )}

      {/* Render the chat link */}
      <Link
        href={chat.path}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full px-8 transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10',
          isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800'
        )}
      >
        {/* Render the chat title with an ellipsis if it's too long */}
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title={chatTitle}
        >
          {/* Conditionally render the chat title animation */}
          {shouldAnimate ? (
            chatTitle.split('').map((character, index) => (
              <motion.span
                key={index}
                variants={{
                  initial: {
                    opacity: 0,
                    x: -100
                  },
                  animate: {
                    opacity: 1,
                    x: 0
                  }
                }}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 0.25,
                  ease: 'easeIn',
                  delay: index * 0.05,
                  staggerChildren: 0.05
                }}
                onAnimationComplete={() => {
                  if (index === chatTitle.length - 1) {
                    setNewChatId(null)
                  }
                }}
              >
                {character}
              </motion.span>
            ))
          ) : (
            <span>{chatTitle}</span>
          )}
        </div>
      </Link>

      {/* Conditionally render the active chat's additional content */}
      {isActive && <div className="absolute right-2 top-1">{children}</div>}
    </div>
  )
}
