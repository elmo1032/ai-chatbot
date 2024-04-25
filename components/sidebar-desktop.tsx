import { Sidebar } from '@/components/sidebar'
import { auth } from '@/auth'
import { ChatHistory } from '@/components/chat-history'

interface SidebarDesktopProps {
  userId?: string | null
}

export async function SidebarDesktop({ userId }: SidebarDesktopProps) {
  const session = await auth()

  // If the user is not logged in, return null
  if (!session?.user?.id) {
    return null
  }

  // If the userId prop is provided, use it; otherwise, use the user id from the session
  const effectiveUserId = userId || session.user.id

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <ChatHistory userId={effectiveUserId} />
    </Sidebar>
  )
}
