import { Sidebar } from '@/components/sidebar' // Importing the Sidebar component
import { auth } from '@/auth' // Importing the auth function
import { ChatHistory } from '@/components/chat-history' // Importing the ChatHistory component

interface SidebarDesktopProps { // Defining the SidebarDesktopProps interface
  userId?: string | null // Declaring the userId prop with optional string type
}

export async function SidebarDesktop({ userId }: SidebarDesktopProps) { // Exporting the SidebarDesktop async function and destructuring the userId prop
  const session = await auth() // Calling the auth function to get the user session

  // If the user is not logged in, return null
  if (!session?.user?.id) {
    return null
  }

  // If the userId prop is provided, use it; otherwise, use the user id from the session
  const effectiveUserId = userId || session.user.id

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <ChatHistory userId={effectiveUserId} /> {/* Passing the effectiveUserId to the ChatHistory component */}
    </Sidebar>
  )
}

