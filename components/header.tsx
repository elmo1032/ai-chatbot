// Import necessary modules and components
import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Custom hooks and utility functions
import { cn } from '@/lib/utils'
import { auth } from '@/auth'

// Custom components
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'

// UserOrLogin component
const UserOrLogin = () => {
  // Initialize router and session state
  const router = useRouter()
  const [session, setSession] = React.useState(null)

  // Fetch session data when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      const sessionData = await auth()
      setSession(sessionData)
    }

    fetchData()
  }, [])

  // If the user is logged in, render the SidebarMobile and SidebarToggle components
  if (session?.user) {
    return (
      <>
        <SidebarMobile>
          {/* Pass the user's ID to the ChatHistory component */}
          <ChatHistory userId={session.user.id} />
        </SidebarMobile>
        <SidebarToggle />
      </>
    )
  }

  // If the user is not logged in, render a link to the homepage with the NextChat icon
  return (
    <Link href="/" target="_blank" rel="nofollow">
      <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
      <IconNextChat className="hidden size-6 mr-2 dark:block" />
    </Link>
  )
}

// Header component
export function Header() {
  return (
    // Header container with flex, items-center, justify-between, w-full, h-16, px-4, border-b, shrink-0, and bg-gradient-to-b classes
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      {/* Container for UserOrLogin and other user-related components */}
      <div className="flex items-center">
        <UserOrLogin />
      </div>
      {/* Container for external links and buttons */}
      <div className="flex items-center justify-end space-x-2">
        {/* GitHub button with outline variant and external link */}
        <a
          target="_blank"
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="hidden ml-2 md:flex">GitHub</span>
        </a>
        {/* Deploy button with secondary variant, small size, and external link */}
        <Button
          variant="secondary"
          className={cn(buttonVariants({ size: 'sm' }))}
          asChild
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="hidden sm:block">Deploy to Vercel</span>
          <span className="sm:hidden">Deploy</span>
          <IconVercel className="ml-2" />
        </Button>
      </div>
    </header>
  )
}
